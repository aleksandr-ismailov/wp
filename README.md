# WordPress + Next.js Web Application

A comprehensive web application combining WordPress as CMS backend and Next.js as frontend framework. The project is configured for development in Docker containers with full devcontainer environment support.

## 🏗️ Project Architecture

- **WordPress** (PHP 8.2 + Apache) - CMS backend on port 8888
- **Next.js** (React 19 + TypeScript) - Frontend application on port 3000
- **MySQL 8.0** - Database
- **phpMyAdmin** - Web interface for database management on port 8080
- **Yarn Workspaces** - Dependency management in monorepo

## 📁 Project Structure

```
wp/
├── .devcontainer/              # Dev container configuration
│   ├── devcontainer.json      # VS Code devcontainer settings
│   ├── docker-compose.yml     # Docker compose for development
│   └── post-create.sh         # Container post-setup script
├── client/                    # Next.js application
│   ├── src/                   # Frontend source code
│   ├── public/               # Static files
│   └── package.json          # Client dependencies
├── wp-content/               # WordPress content
│   ├── plugins/              # WordPress plugins
│   └── themes/               # WordPress themes
├── package.json              # Root dependencies and scripts
├── composer.json             # PHP dependencies and linters
└── docker-compose.yml        # Docker compose file
```

## 🚀 Quick Start

### Requirements

- [Docker](https://www.docker.com/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

### Initial Setup

1. **Clone repository:**

    ```bash
    git clone <repository-url>
    cd wp
    ```

2. **Open in Dev Container:**
    - Open project in VS Code
    - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS)
    - Select "Dev Containers: Reopen in Container"
    - Wait for container build and setup

3. **WordPress setup (runs automatically):**

    ```bash
    # Install WordPress (if not done automatically)
    yarn setup-wp

    # Activate plugins
    yarn activate-plugins
    ```

### Running the Project

**Start full development stack:**

```bash
yarn dev
```

This command:

- Starts Docker containers (WordPress, MySQL, phpMyAdmin)
- Starts Next.js dev server with hot reload
- Shows real-time logs

**Alternative commands:**

```bash
# Docker services only
yarn start
docker-compose -f .devcontainer/docker-compose.yml up -d

# Stop services
yarn stop

# Restart
yarn restart

# View logs
yarn logs

# Services status
yarn status
```

## 🔧 Development Commands

### Frontend (Next.js)

```bash
# Development (inside client/)
cd client
yarn dev

# Production build
yarn build

# Start production
yarn start

# Linting
yarn lint
```

### Backend (WordPress + PHP)

```bash
# PHP linting
yarn lint:php
composer lint

# Auto-fix PHP code
yarn format:php
composer fix

# Lint entire project
yarn lint

# Fix all linting errors
yarn lint:fix
```

### Package Management

```bash
# Update all workspace packages
yarn packages-update

# Install dependencies
yarn install

# Create plugin zip archives
yarn plugin-zip
```

### WordPress Commands

```bash
# Install WordPress
yarn setup-wp

# Activate all plugins
yarn activate-plugins

# Create new block
yarn add-block

# Create dynamic block
yarn add-block:dynamic

# Create theme block
yarn add-block:theme
```

## 🌐 Development URLs

- **WordPress site:** http://localhost:8888
    - Admin: http://localhost:8888/wp-admin
    - Login: `admin` / Password: `admin`
- **Next.js application:** http://localhost:3000
- **phpMyAdmin:** http://localhost:8080
    - User: `wordpress` / Password: `wordpress`

## 🔀 Git Workflow

### Creating New Branches

```bash
# Create feature branch
git checkout -b feature/new-feature

# Create bugfix branch
git checkout -b bugfix/fix-issue

# Create hotfix branch
git checkout -b hotfix/critical-fix
```

### Branch Naming Conventions

- `feature/` - new features
- `bugfix/` - bug fixes
- `hotfix/` - critical fixes
- `refactor/` - code refactoring
- `docs/` - documentation updates

### Development Workflow

1. **Create branch:**

    ```bash
    git checkout develop
    git pull origin develop
    git checkout -b feature/my-feature
    ```

2. **Development:**

    ```bash
    # Make changes
    git add .
    git commit -m "feat: add new feature"
    ```

3. **Push changes:**

    ```bash
    git push origin feature/my-feature
    ```

4. **Create Pull Request:**
    - Create PR in GitHub/GitLab
    - Assign reviewers
    - Wait for approval and merge

### Commit Conventions

Use [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat: add new feature
fix: fix authentication bug
docs: update documentation
style: fix code formatting
refactor: refactor auth component
test: add API tests
chore: update dependencies
```

## 🧪 Testing

### E2E Testing (Playwright)

```bash
# Run E2E tests
yarn test:e2e

# Run in debug mode
yarn test:e2e:debug
```

## 🔧 Development Environment Setup

### VS Code Extensions (installed automatically)

- **PHP:** Intelephense, PHPCS
- **JavaScript/TypeScript:** ESLint, Prettier
- **WordPress:** WordPress Toolbox, WordPress Hooks
- **Git:** GitLens
- **General:** Material Icon Theme, Path Intellisense

### Terminal Setup

After opening in devcontainer, automatically configured:

- **Zsh** with oh-my-zsh
- **Two-line prompt** with git information
- **Dracula color scheme**
- **Git aliases** and convenient commands

Example prompt:

```
╭─ root ➜ /workspaces/wp (develop) ✗ (origin +1 -1)
╰$
```

## 📦 Production Build

### Frontend Build

```bash
# Build Next.js application
cd client
yarn build

# Or from project root
yarn build
```

### WordPress Deploy

```bash
# Create plugin archives
yarn plugin-zip

# Files will be in wp-content/plugins/*/build/
```

## 🛠️ Troubleshooting

### Container Issues

```bash
# Restart all services
yarn restart

# Full container rebuild
docker-compose -f .devcontainer/docker-compose.yml down
docker-compose -f .devcontainer/docker-compose.yml up --build -d
```

### Dependency Issues

```bash
# Clean and reinstall
rm -rf node_modules client/node_modules
yarn install

# Clean PHP dependencies
rm -rf vendor
composer install
```

### Database Issues

```bash
# Connect to MySQL
docker exec -it wp-dev-mysql mysql -u wordpress -p wordpress

# Reset WordPress (removes all data)
docker-compose -f .devcontainer/docker-compose.yml down -v
docker-compose -f .devcontainer/docker-compose.yml up -d
yarn setup-wp
```

## 📝 Additional Information

### Useful Docker Commands

```bash
# View service logs
docker-compose -f .devcontainer/docker-compose.yml logs wordpress
docker-compose -f .devcontainer/docker-compose.yml logs mysql

# Connect to container
docker exec -it wp-dev-wordpress bash
docker exec -it wp-dev-mysql bash

# Clean volumes
docker-compose -f .devcontainer/docker-compose.yml down -v
```

### Workspace Structure

Project uses Yarn workspaces:

- `client/` - Next.js application
- `wp-content/plugins/*` - WordPress plugins
- `wp-content/themes/*` - WordPress themes

### Linting Configuration

- **PHP:** WordPress Coding Standards (WPCS)
- **JavaScript/TypeScript:** ESLint + Prettier
- **CSS:** Stylelint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Ensure all tests pass
5. Create a Pull Request

## 📄 License

ISC License

---

**Important Notes:**

- Always work inside devcontainer for environment consistency
- Use yarn instead of npm for package management
- Follow branch naming and commit conventions
- Run linters before committing changes
- Test changes in browser before creating PR
