# Lumo - Talk to Different Minds

A multi-personality AI chat application with traditional login/signup and Google OAuth authentication, backed by SQLite database. Features a diverse collection of AI characters from different cultures and backgrounds.

## Setup

1. Install dependencies:
   ```bash
   pip install -r requirement.txt
   ```

2. Set up Google OAuth (optional):
   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Create/select a project
   - Enable Google+ API
   - Create OAuth 2.0 Client ID
   - Add `http://localhost:5000/authorize` as authorized redirect URI
   - Copy Client ID and Client Secret to `.env` file

3. Update `.env` file with your credentials:
   ```
   GOOGLE_CLIENT_ID=your_client_id (optional)
   GOOGLE_CLIENT_SECRET=your_client_secret (optional)
   SECRET_KEY=your_random_secret_key
   DATABASE_URL=sqlite:///lumo.db
   ```

4. Run the application:
   ```bash
   python app.py
   ```

5. Open http://localhost:5000 in your browser

## Features

- Traditional email/password registration and login
- Google OAuth login (optional)
- SQLite database for user management
- Interactive dashboard with diverse AI characters
- Real-time chat with different personalities
- Session-based authentication
- **NEW:** Dark/Light mode toggle
- **NEW:** Chat history storage and retrieval
- **NEW:** Improved loading states and user feedback
- Responsive design

## AI Characters Available

### Western Characters
- **Visionary**: Forward-thinking innovator focused on future possibilities
- **Analyst**: Data-driven strategist who breaks down complex problems
- **Philosopher**: Deep thinker exploring life's fundamental questions
- **Mentor**: Disciplined guide helping achieve goals through structured advice

### Fictional Characters
- **Sherlock Holmes**: Brilliant detective using deduction to solve mysteries
- **Master Yoda**: Wise Jedi Master offering profound insights about balance
- **Tony Stark**: Genius inventor combining technical expertise with sharp wit

### Korean Characters
- **King Sejong**: Scholar king who created Hangul, valuing education and culture
- **Kimchi Spirit**: Cultural guide sharing Korean traditions and harmony
- **Hwarang Warrior**: Noble warrior embodying honor, discipline, and loyalty

### Indian Characters
- **Chanakya**: Ancient strategist and author of Arthashastra on governance
- **Kalidasa**: India's greatest poet offering insights on beauty and art
- **Siddhartha Gautama**: The Buddha teaching enlightenment and compassion
- **Mahatma Gandhi**: Freedom fighter teaching non-violence and social justice

## Database Schema

The application uses SQLite with the following models:

### User Model
- `id`: Primary key
- `email`: Unique email address
- `password_hash`: Hashed password (nullable for OAuth users)
- `name`: User's full name
- `google_id`: Google OAuth ID (nullable)
- `created_at`: Account creation timestamp
- `last_login`: Last login timestamp

### Chat Model (NEW)
- `id`: Primary key
- `user_id`: Foreign key to User
- `character`: Character name used in conversation
- `message`: User's message
- `response`: AI response
- `created_at`: Conversation timestamp

## API Endpoints

- `POST /api/login`: Traditional login
- `POST /api/signup`: User registration
- `GET /api/user`: Get current user info
- `POST /api/chat`: Send message to AI character
- `GET /api/chat-history`: Get user's chat history (NEW)
- `/login/google`: Google OAuth login
- `/logout`: Logout
- `/dashboard`: Main dashboard with character selection

## Project Structure

- `app.py` - Flask backend with authentication and database
- `database.py` - Database initialization
- `model.py` - SQLAlchemy models
- `requirement.txt` - Python dependencies
- `.env` - Environment variables (create this file)
- `.python-version` - Python runtime version
- `.gitignore` - Git ignore rules
- `instance/` - SQLite instance files
  - `lumo.db` - SQLite database (created automatically)
- `static/` - CSS and JavaScript assets
  - `css/` - Stylesheets
  - `js/` - JavaScript files
- `templates/` - HTML template files
  - `index.html` - Landing page
  - `login.html` - Login page
  - `register.html` - Signup page
  - `dashboard.html` - Dashboard page
- `utils/` - Optional utility scripts
  - `check_db.py`
  - `test_api.py`
