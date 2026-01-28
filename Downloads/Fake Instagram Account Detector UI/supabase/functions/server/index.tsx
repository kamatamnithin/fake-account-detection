import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Create Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-828f33b3/health", (c) => {
  return c.json({ status: "ok" });
});

// Sign up endpoint
app.post("/make-server-828f33b3/signup", async (c) => {
  try {
    const { email, password, name } = await c.req.json();

    if (!email || !password) {
      return c.json({ error: 'Email and password are required' }, 400);
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name: name || email.split('@')[0] },
      // Automatically confirm the user's email since an email server hasn't been configured
      email_confirm: true,
    });

    if (error) {
      console.error('Signup error:', error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ 
      message: 'User created successfully', 
      user: { id: data.user?.id, email: data.user?.email }
    });
  } catch (error) {
    console.error('Signup error:', error);
    return c.json({ error: 'Failed to create user' }, 500);
  }
});

// Login endpoint (uses client-side Supabase auth, this is just for demonstration)
app.post("/make-server-828f33b3/login", async (c) => {
  try {
    const { email, password } = await c.req.json();

    if (!email || !password) {
      return c.json({ error: 'Email and password are required' }, 400);
    }

    // Note: In production, login should be handled client-side using Supabase client
    // This endpoint is for demonstration purposes
    return c.json({ 
      message: 'Please use client-side Supabase auth for login',
      success: false 
    });
  } catch (error) {
    console.error('Login endpoint error:', error);
    return c.json({ error: 'Login endpoint error' }, 500);
  }
});

// ML Analysis endpoint
app.post("/make-server-828f33b3/analyze", async (c) => {
  try {
    const { username, followers, following, posts, accountAge } = await c.req.json();

    if (!username) {
      return c.json({ error: 'Username is required' }, 400);
    }

    // ML-based analysis (enhanced rule-based system)
    const ratio = following > 0 ? followers / following : 0;
    const postsPerMonth = accountAge > 0 ? posts / accountAge : 0;
    const engagementRate = posts > 0 ? followers / posts : 0;

    let score = 50;
    let details = '';
    let flags = [];

    // Follower/Following ratio analysis
    if (ratio > 2) { 
      score += 20; 
      details += 'Excellent follower/following ratio indicates authentic account. ';
    } else if (ratio > 1) { 
      score += 15; 
      details += 'Good follower/following ratio. ';
    } else if (ratio < 0.1) { 
      score -= 25; 
      details += 'Very low follower/following ratio - possible fake account. ';
      flags.push('low_ratio');
    } else if (ratio < 0.5) {
      score -= 15;
      details += 'Low follower/following ratio. ';
    }

    // Posting activity analysis
    if (posts > 100) { 
      score += 15; 
      details += 'High posting activity indicates active user. ';
    } else if (posts > 50) { 
      score += 10; 
      details += 'Moderate posting activity. ';
    } else if (posts < 10) {
      score -= 20;
      details += 'Very low posting activity - suspicious. ';
      flags.push('low_posts');
    }

    // Posting frequency analysis
    if (postsPerMonth >= 3) {
      score += 10;
      details += 'Consistent posting frequency. ';
    } else if (postsPerMonth < 0.5) {
      score -= 15;
      details += 'Irregular posting frequency. ';
    }

    // Account age analysis
    if (accountAge < 1) {
      score -= 20;
      details += 'Very new account - higher risk. ';
      flags.push('new_account');
    } else if (accountAge < 3) {
      score -= 10;
      details += 'Relatively new account. ';
    } else if (accountAge > 24) {
      score += 10;
      details += 'Well-established account. ';
    }

    // Follower count analysis
    if (followers > 10000) {
      score += 15;
      details += 'Large following indicates established presence. ';
    } else if (followers > 1000) {
      score += 10;
      details += 'Good following count. ';
    } else if (followers < 50) {
      score -= 10;
      details += 'Low follower count. ';
    }

    // Engagement analysis
    if (engagementRate < 0.01 && followers > 1000) {
      score -= 20;
      details += 'Very low engagement rate for follower count - possible bot followers. ';
      flags.push('low_engagement');
    }

    // Determine status
    let status: 'real' | 'fake' | 'suspicious';
    if (score >= 75) {
      status = 'real';
    } else if (score >= 45) {
      status = 'suspicious';
    } else {
      status = 'fake';
    }

    // Clamp score to 0-100
    score = Math.max(0, Math.min(100, score));

    // Store analysis result in KV store for history
    const timestamp = new Date().toISOString();
    const analysisKey = `analysis:${username}:${timestamp}`;
    await kv.set(analysisKey, {
      username,
      followers,
      following,
      posts,
      accountAge,
      result: { status, score, details, flags },
      timestamp,
    });

    return c.json({ status, score, details, flags });
  } catch (error) {
    console.error('ML Analysis error:', error);
    return c.json({ error: 'Analysis failed' }, 500);
  }
});

// Get analysis history endpoint
app.get("/make-server-828f33b3/history", async (c) => {
  try {
    const results = await kv.getByPrefix('analysis:');
    return c.json({ history: results });
  } catch (error) {
    console.error('Get history error:', error);
    return c.json({ error: 'Failed to fetch history' }, 500);
  }
});

Deno.serve(app.fetch);