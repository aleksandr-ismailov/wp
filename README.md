# WordPress Block Development Learning Environment

Modern development environment for learning WordPress block development with Gutenberg blocks, using Docker, TypeScript, and modern development tools.

## Technologies Used

-   **WordPress:** 6.7 with PHP 8.2
-   **Database:** MySQL 8.0 with phpMyAdmin
-   **Development:** Node.js 20, TypeScript, Yarn 4.5.3
-   **Testing:** Playwright for E2E testing
-   **Code Quality:** ESLint, Prettier, PHP CodeSniffer
-   **Container:** Dev Container with oh-my-zsh

## Project Structure

```
├── wp-content/
│   ├── plugins/
│   │   └── copyright-date-block/     # Example custom block
│   └── themes/
│       └── twentytwentyfour/         # WordPress theme
├── .devcontainer/                    # Dev container configuration
├── e2e/                             # Playwright E2E tests
└── package.json                     # Yarn workspaces configuration
```

## Setup Instructions

### Prerequisites

-   Docker Desktop
-   VS Code or Cursor with Dev Containers extension

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

-   **Working directory:** `/workspaces/wp`
-   **User:** `root`
-   **Shell:** `zsh` with custom two-line prompt showing git status
-   **Tools:** wp-cli, composer, yarn, playwright

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
yarn add-block         # Create new static block
yarn add-block:dynamic # Create new dynamic block
```

### Testing & Quality

```bash
yarn test:e2e          # Run Playwright E2E tests
yarn test:e2e:debug    # Run E2E tests in debug mode
yarn lint              # Lint PHP, JS, and CSS
yarn lint:php          # Lint PHP files only
yarn format:php        # Format PHP files
```

### Package Management

```bash
yarn install           # Install dependencies
yarn packages-update   # Update workspace packages
yarn plugin-zip        # Create plugin ZIP files
```

## Available Services

After running `yarn dev`, these services will be available:

-   **WordPress site:** http://localhost:8888
-   **WordPress admin:** http://localhost:8888/wp-admin
    -   Username: `admin`
    -   Password: `admin`
-   **phpMyAdmin:** http://localhost:8080
-   **Development Server:** http://localhost:3000
-   **Additional port:** http://localhost:3001

## Development Workflow

1. **Start development:**

    ```bash
    yarn dev
    ```

2. **Create a new block:**

    ```bash
    yarn add-block my-custom-block
    ```

3. **Develop and test:**

    - Edit block code in `wp-content/plugins/[block-name]/`
    - View changes at http://localhost:8888
    - Run tests with `yarn test:e2e`

4. **Code quality:**
    ```bash
    yarn lint              # Check code quality
    yarn format:php        # Format PHP code
    ```

## Terminal Features

The dev container includes a customized zsh prompt with:

-   Two-line format showing username, directory, and git status
-   Git branch and upstream information
-   Visual indicators for clean/dirty repository state
-   Dracula color scheme
