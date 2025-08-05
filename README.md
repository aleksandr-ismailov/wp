# WordPress Block Development Learning Environment

Modern development environment for learning WordPress block development with Gutenberg blocks and Next.js frontend integration, using Docker, TypeScript, and modern development tools.

## Technologies Used

- **WordPress:** 6.7 with PHP 8.2
- **Database:** MySQL 8.0 with phpMyAdmin
- **Frontend:** Next.js 15, React 19, TypeScript
- **Development:** Node.js 20, Yarn 4.5.3, Turbopack
- **UI:** Tailwind CSS 4, Radix UI, Lucide React
- **Auth:** NextAuth.js 4
- **Testing:** Playwright for E2E testing
- **Code Quality:** ESLint, Prettier, PHP CodeSniffer, Stylelint
- **Container:** Dev Container with oh-my-zsh

## Project Structure

```
├── wp-content/
│   ├── plugins/
│   │   └── basic-auth/              # Example custom plugin
│   └── themes/
│       ├── twentytwentyfour/        # WordPress theme
│       └── client-api/              # Custom theme workspace
├── client/                          # Next.js frontend application
│   ├── src/                         # Next.js source code
│   ├── public/                      # Static assets
│   └── package.json                 # Frontend dependencies
├── .devcontainer/                   # Dev container configuration
├── e2e/                            # Playwright E2E tests
└── package.json                    # Yarn workspaces configuration
```

## Setup Instructions

### Prerequisites

- Docker Desktop
- VS Code or Cursor with Dev Containers extension

### Getting Started

1. **Clone and open the project:**

    ```bash
    git clone <repository-url>
    cd wordpress-block-development-learning
    code .  # or cursor .
    ```

2. **Launch dev container:**
    - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
    - Type "Dev Containers: Reopen in Container"
    - Wait for container build (may take several minutes on first run)

3. **Setup WordPress (after container is ready):**

    ```bash
    yarn setup-wp
    yarn activate-plugins
    ```

### Environment Details

After container launch you'll have:

- **Working directory:** `/workspaces/wp`
- **User:** `root`
- **Shell:** `zsh` with custom two-line prompt showing git status
- **Tools:** wp-cli, composer, yarn, playwright

## Available Commands

### WordPress Management

```bash
yarn setup-wp          # Install and configure WordPress
yarn activate-plugins  # Activate all custom plugins
```

### Development

```bash
yarn dev               # Start development environment with watch mode
yarn build             # Build all blocks for production
yarn stop              # Stop Docker services
yarn restart           # Restart Docker services
yarn logs              # View Docker services logs
yarn status            # Check Docker services status
```

### Block Development

```bash
yarn add-block         # Create new static block in plugins
yarn add-block:dynamic # Create new dynamic block in plugins
yarn add-block:theme   # Create new block in client-api theme
```

### Testing & Quality

```bash
yarn test:e2e          # Run Playwright E2E tests
yarn test:e2e:debug    # Run E2E tests in debug mode
yarn lint              # Lint PHP, JS, and CSS
yarn lint:php          # Lint PHP files only
yarn format:php        # Format PHP files
yarn format:css        # Format CSS files in all workspaces
```

### Package Management

```bash
yarn install           # Install dependencies
yarn packages-update   # Update workspace packages
yarn plugin-zip        # Create plugin ZIP files
```

### Frontend Development

```bash
# Client workspace commands (from root)
yarn workspace client dev      # Start Next.js development server
yarn workspace client build    # Build Next.js for production
yarn workspace client start    # Start Next.js production server
yarn workspace client lint     # Lint Next.js code
```

## Available Services

After running `yarn dev`, these services will be available:

- **WordPress site:** http://localhost:8888
- **WordPress admin:** http://localhost:8888/wp-admin
    - Username: `admin`
    - Password: `admin`
- **phpMyAdmin:** http://localhost:8080
- **Next.js Frontend:** http://localhost:3000 (with Turbopack)
- **Additional port:** http://localhost:3001

## Development Workflow

1. **Start development:**

    ```bash
    yarn dev
    ```

2. **Create blocks:**

    ```bash
    # Plugin block
    yarn add-block my-custom-block
    # Theme block
    yarn add-block:theme my-theme-block
    ```

3. **Develop and test:**
    - Edit WordPress blocks in `wp-content/plugins/[block-name]/`
    - Edit Next.js frontend in `client/src/`
    - View WordPress at http://localhost:8888
    - View Next.js app at http://localhost:3000
    - Run tests with `yarn test:e2e`

4. **Code quality:**
    ```bash
    yarn lint              # Check code quality
    yarn format:php        # Format PHP code
    yarn format:css        # Format CSS code
    ```

## Terminal Features

The dev container includes a customized zsh prompt with:

- Two-line format showing username, directory, and git status
- Git branch and upstream information
- Visual indicators for clean/dirty repository state
- Dracula color scheme
