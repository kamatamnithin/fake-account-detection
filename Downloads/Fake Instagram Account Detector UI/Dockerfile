FROM python:3.11-slim

WORKDIR /app

# Copy backend folder
COPY backend/ ./backend/

# Install dependencies
RUN pip install --no-cache-dir -r backend/requirements.txt

# Expose port
EXPOSE $PORT

# Run backend service
CMD ["python", "-u", "backend/backend_ml_service.py"]
