# Complete Beginner's Guide to Your Obsidian Weblog

## 🎯 What We're Going to Do
We're going to turn your markdown notes into a beautiful website that you can share with the world, just like Obsidian Publish but for free!

## 📋 What You Need Before Starting
- A computer with internet
- A GitHub account (we'll create one if you don't have it)
- Basic knowledge of using terminal/command prompt

---

## Step 1: Set Up Your Computer 🖥️

### Install Node.js (the engine that runs our code)
1. Go to https://nodejs.org
2. Download the "LTS" version (the stable one)
3. Install it like any other program
4. Test it works:
   - Open terminal/command prompt
   - Type: `node --version`
   - You should see a version number like `v18.17.0`

---

## Step 2: Get Your Project Ready 📁

### In your terminal/command prompt:
```bash
# Go to your project folder
cd /path/to/your/Obsidian-like-weblog

# Install all the tools we need (this downloads packages)
npm install
```

**What this does:** Downloads all the helper tools (like markdown parser, graph maker, etc.)

---

## Step 3: Write Your First Articles ✍️

### Create your content:
1. Open the `content` folder
2. You'll see example files like `Welcome.md`, `JavaScript.md`
3. Edit these or create new `.md` files

### Use Obsidian-style links:
```markdown
# My First Article

This is my article about [[Programming]].

I also wrote about [[My Hobbies|my hobbies]] (this shows "my hobbies" but links to "My Hobbies.md")
```

**Rule:** File names become links. `Programming.md` → `[[Programming]]`

---

## Step 4: Build Your Website 🏗️

### Test it locally first:
```bash
# Build the website
npm run build

# See it in your browser
npm run dev
```

**What this does:**
- Converts your `.md` files to HTML pages
- Creates a graph showing how your articles connect
- Makes it ready for the web

Open your browser and go to the address shown (usually `http://localhost:3000`)

---

## Step 5: Put It on GitHub (The Tricky Part Made Easy) 🚀

### Part A: Create a GitHub Account
1. Go to https://github.com
2. Click "Sign up"
3. Choose a username (this will be in your website URL)
4. Verify your email

### Part B: Create a Repository (Storage for Your Code)
1. Click the green "New" button or "Create repository"
2. Repository name: `your-username.github.io` (replace `your-username` with your actual username)
   - Example: If your username is `johnsmith`, name it `johnsmith.github.io`
3. Make it **Public** (so GitHub Pages works for free)
4. Don't add README, .gitignore, or license (we already have files)
5. Click "Create repository"

### Part C: Upload Your Code
You'll see a page with instructions. Follow the "push an existing repository" section:

```bash
# Tell Git who you are (first time only)
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"

# Initialize Git in your project folder
git init

# Add all your files
git add .

# Save your changes with a message
git commit -m "Initial commit - My Obsidian weblog"

# Connect to your GitHub repository (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/YOUR-USERNAME.github.io.git

# Push your code to GitHub
git push -u origin main
```

**If you get asked for username/password:**
- Username: your GitHub username
- Password: Use a "Personal Access Token" instead of your regular password
  - Go to GitHub → Settings → Developer settings → Personal access tokens → Generate new token
  - Give it "repo" permissions
  - Copy the token and use it as your password

### Part D: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", select "GitHub Actions"
5. Your website will be available at: `https://your-username.github.io`

---

## Step 6: The Magic Workflow ✨

From now on, every time you want to update your blog:

1. **Write:** Add or edit `.md` files in the `content` folder
2. **Test:** Run `npm run build` and `npm run dev` to check locally
3. **Publish:** Push to GitHub:
   ```bash
   git add .
   git commit -m "Added new article about cats"
   git push
   ```
4. **Wait:** GitHub automatically builds and updates your website (2-3 minutes)
5. **Visit:** Check `https://your-username.github.io`

---

## 🎉 Congratulations!

You now have:
- ✅ A website that turns your markdown into web pages
- ✅ Obsidian-style `[[backlinks]]`
- ✅ A cool graph showing how your articles connect
- ✅ Automatic publishing when you push to GitHub
- ✅ Free hosting on GitHub Pages

## 🆘 Common Problems and Solutions

**"npm: command not found"**
→ You need to install Node.js first

**"Permission denied" on git push**
→ Use a Personal Access Token instead of your password

**"GitHub Pages not working"**
→ Make sure your repository is named `username.github.io` and is public

**"Website is blank"**
→ Check that you have `.md` files in the `content` folder and ran `npm run build`

## 🎯 Next Steps

1. Write more articles with `[[backlinks]]`
2. Check the graph view to see connections
3. Customize the CSS in `src/build.js` to change colors/styles
4. Share your website URL with friends!

Happy blogging! 🎉