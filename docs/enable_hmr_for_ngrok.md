# Unsing Ngrok.com to test the app an a mobile device with HTTPS
[Ngrok.com](https://ngrok.com) is a service which alows you to serve apps from your local development system with a public URL and HTTPS. This allows you to access your locally hosted app from anywhere and with any device.

## Install and configure Ngrok
### Step 1: Install ngrok
On Mac you can install ngrok with homebrew
```
brew install --cask ngrok
```
for other systems please visit:  
[https://ngrok.com/download](https://ngrok.com/download)

### Step 2: Sign up for ngrok
You have to sign up for the ngrok service by using this link:
[https://dashboard.ngrok.com/signup](https://dashboard.ngrok.com/signup)

### Step 3: Add your auth token to ngrok
after you signed up for ngrok you can use your auth token to complete you local ngrok setup.
You can find you token in your [online account](https://dashboard.ngrok.com/get-started/your-authtoken). 
```
ngrok config add-authtoken <your-token>
```

## Serve your local app with ngrok

### Step 1: start the app server
```
nx serve geo-ar
```

### Step 2: Start the app server
```
ngrok http 4200
```

Now ngrok provides you an URL which you can use to access your locally hosted app from anywhere and with any device through a public URL with HTTPS.