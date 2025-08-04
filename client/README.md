# Step-by-Step Plan: Headless Application with Sign In + Home Page

> **Official Recommendations:** Structure based on [WordPress Developer Handbook](https://developer.wordpress.org/news/2023/04/13/a-developers-guide-to-block-themes-part-2-headless-wordpress/) and [Next.js Learn Course](https://nextjs.org/learn/dashboard-app) for headless architecture.

## Creating Project Structure

### Step 1: Create Next.js application
```bash
# In project root (next to wp-content)
yarn create next-app client --typescript --tailwind --eslint --app --src-dir
cd client
```

### Step 2: Install dependencies for Next.js
```bash
# In client/
yarn add next-auth
yarn dlx shadcn@latest init
yarn dlx shadcn@latest add button input form card
yarn add lucide-react
cd ..
```
**Documentation:** [NextAuth.js](https://next-auth.js.org/getting-started/introduction), [shadcn/ui](https://ui.shadcn.com/docs)

### Step 3: Create WordPress theme
```bash
# In project root
cd wp-content/themes
mkdir client-api
cd client-api
```

### Step 4: Create WordPress theme structure
```bash
# In wp-content/themes/client-api/
touch style.css
touch functions.php
touch theme.json
touch package.json
mkdir templates
touch templates/index.html
mkdir inc
mkdir src
cd ../../../
```

### Step 5: Add theme to workspaces
```bash
# Add "wp-content/themes/client-api" to workspaces array in root package.json
```

### Step 6: Create Next.js application structure
```bash
# In client/src/
cd client/src
mkdir -p app/\(auth\)/sign-in
mkdir -p app/\(dashboard\)/home
mkdir -p lib
mkdir -p components/auth
mkdir -p components/ui
cd ../..
```

## WordPress Backend Setup

### Step 7: Create block for content management
```bash
# In wp-content/themes/client-api/
cd wp-content/themes/client-api
yarn dlx @wordpress/create-block@latest page-content --namespace=client-api --template=src
cd ../../../
```
**Purpose:** Block for creating and editing content for all pages (sign in, home page, future pages)
**Documentation:** [Block Development Tutorial](https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/)

### Step 8: Fill basic WordPress theme files
```bash
# Add minimal content to:
# - wp-content/themes/client-api/style.css
# - wp-content/themes/client-api/functions.php
# - wp-content/themes/client-api/theme.json
# - wp-content/themes/client-api/templates/index.html
# - wp-content/themes/client-api/package.json
```
**Documentation:** [Block Theme Structure](https://developer.wordpress.org/themes/block-themes/)

### Step 9: Add API endpoints in functions.php
```bash
# In wp-content/themes/client-api/functions.php add:
# - /wp-json/client-api/v1/auth - for user verification
# - /wp-json/client-api/v1/pages - for getting pages
```
**Documentation:** [REST API Endpoints](https://developer.wordpress.org/rest-api/extending-the-rest-api/adding-custom-endpoints/)

### Step 10: Configure CORS for headless
```bash
# In functions.php add CORS headers
# This will allow Next.js to connect to WordPress API
```

## Next.js Frontend Setup

### Step 11: Create basic Next.js files
```bash
# In client/src/ create:
cd client/src
touch app/\(auth\)/sign-in/page.tsx
touch app/\(dashboard\)/home/page.tsx
touch lib/wordpress-api.ts
touch lib/auth.ts
touch components/auth/SignInForm.tsx
touch .env.local
cd ../..
```

### Step 12: Configure NextAuth
```bash
cd client/src
mkdir -p app/api/auth/\[...nextauth\]
touch app/api/auth/\[...nextauth\]/route.ts
cd ../..
```
**Documentation:** [NextAuth App Router](https://next-auth.js.org/getting-started/introduction)

### Step 13: Create WordPress API client
```bash
# In client/src/lib/wordpress-api.ts create functions for:
# - getting user data from WordPress
# - getting page content created through blocks
```

### Step 14: Configure Tailwind CSS 4
```bash
# In client/src/app/globals.css configure @theme instead of config file
```
**Documentation:** [Tailwind v4 Alpha](https://tailwindcss.com/blog/tailwindcss-v4-alpha)

### Step 15: Fill components and pages
```bash
# Create code for:
# - SignInForm component
# - sign-in and home pages
# - connecting WordPress API to components
```

## Running and Testing

### Step 16: Ensure WordPress is running
```bash
# Check that container is working
yarn dev
# If not, then start it
```

### Step 17: Activate WordPress theme
```bash
# Go to WordPress admin http://localhost:8888/wp-admin
# Login: admin, password: admin
# Appearance → Themes → Activate client-api
```

### Step 18: Start Next.js application
```bash
cd client
yarn dev
# Open http://localhost:3000
```

## Final Structure

WordPress Backend API:
wp-content/themes/client-api/
├── functions.php          # API endpoints + CORS
├── inc/                   # Additional files
├── templates/index.html   # Base template
├── package.json          # Theme dependencies
└── src/page-content/     # Gutenberg block

Next.js Frontend App:
client/
├── src/app/(auth)/sign-in/    # Sign in page
├── src/app/(dashboard)/home/  # Home page
├── src/components/auth/       # Auth components
├── src/lib/                   # API clients
└── .env.local                 # Environment variables

Complete Project Structure:
project-root/
├── wp-content/            # WordPress CMS
├── client/                # Next.js Frontend (separate project)
├── package.json           # WordPress dependencies + workspaces
└── docker-compose.yml     # Container

## What You'll Learn

- ✅ **Gutenberg blocks** through creating content management block
- ✅ **Headless architecture** through WordPress REST API
- ✅ **NextAuth.js** integration with custom provider
- ✅ **shadcn/ui + Tailwind v4** modern UI
- ✅ **Complete application** with authentication and protected routes

## Useful Links

- [WordPress Block Editor Handbook](https://developer.wordpress.org/block-editor/)
- [WordPress REST API](https://developer.wordpress.org/rest-api/)
- [WordPress Headless Guide](https://developer.wordpress.org/news/2023/04/13/a-developers-guide-to-block-themes-part-2-headless-wordpress/)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [shadcn/ui Components](https://ui.shadcn.com/docs)
- [Tailwind CSS v4](https://tailwindcss.com/blog/tailwindcss-v4-alpha)
- [Next.js Learn Course](https://nextjs.org/learn/dashboard-app)
