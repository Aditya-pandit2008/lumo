import requests
import json

BASE_URL = 'http://localhost:5000'

print("🧪 Testing Lumo Application APIs")
print("=" * 40)

# Test 1: Check if server is running
try:
    response = requests.get(BASE_URL)
    print(f"✅ Server Status: {response.status_code} - Running")
except:
    print("❌ Server not running")
    exit()

# Test 2: Check user endpoint (should return 401 - not logged in)
try:
    response = requests.get(f'{BASE_URL}/api/user')
    print(f"✅ User API: {response.status_code} - {'Not logged in' if response.status_code == 401 else 'Unexpected'}")
except:
    print("❌ User API error")

# Test 3: Test signup API
print("\n📝 Testing Signup API...")
signup_data = {
    'name': 'Test User',
    'email': 'test@example.com',
    'password': 'testpass123'
}

try:
    response = requests.post(f'{BASE_URL}/api/signup',
                           json=signup_data,
                           headers={'Content-Type': 'application/json'})
    print(f"✅ Signup API: {response.status_code}")
    if response.status_code == 200:
        print("   User created successfully")
    elif response.status_code == 409:
        print("   User already exists (expected)")
    else:
        print(f"   Response: {response.text}")
except Exception as e:
    print(f"❌ Signup API error: {e}")

# Test 4: Test login API
print("\n🔐 Testing Login API...")
login_data = {
    'email': 'test@example.com',
    'password': 'testpass123'
}

try:
    response = requests.post(f'{BASE_URL}/api/login',
                           json=login_data,
                           headers={'Content-Type': 'application/json'})
    print(f"✅ Login API: {response.status_code}")
    if response.status_code == 200:
        print("   Login successful")
        # Get session cookie for authenticated requests
        session_cookie = response.cookies.get('session')
        if session_cookie:
            print("   Session cookie received")
    else:
        print(f"   Response: {response.text}")
except Exception as e:
    print(f"❌ Login API error: {e}")

print("\n🎉 API Testing Complete!")
print("\n📋 Manual Testing Checklist:")
print("1. Open http://localhost:5000 in browser")
print("2. Click 'Get Started' → should go to login page")
print("3. Try registering a new user")
print("4. Try logging in with created credentials")
print("5. Check dashboard after login")
print("6. Test Google OAuth if configured")
print("7. Run 'python check_db.py' to see database contents")