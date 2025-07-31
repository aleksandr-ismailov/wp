# WordPress Block Development Environment

Development environment for WordPress block development using modern development tools.

## Running the Project in VS Code / Cursor

### Prerequisites

-   Docker Desktop
-   VS Code or Cursor
-   Dev Containers extension for VS Code

### Opening the Project in Dev Container

1. **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd wordpress-block-development-learning
    ```

2. **Open the project in VS Code or Cursor:**

    ```bash
    code .
    # or
    cursor .
    ```

3. **Launch the dev container:**

    - In VS Code: press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
    - Type "Dev Containers: Reopen in Container"
    - Select this command and press Enter

4. **Wait for container build:**
    - On first launch, the container will build automatically
    - The process may take several minutes
    - Progress of dependency installation will be shown in the terminal

### Accessing the Container

After successful container build, you will automatically be inside the dev environment:

-   **Working directory:** `/workspaces/wp`
-   **User:** `root`
-   **Shell:** `zsh` with oh-my-zsh

### Available Ports

After starting the container, the following services will be available:

-   **WordPress site:** http://localhost:8888
-   **WordPress admin:** http://localhost:8888/wp-admin (admin/admin)
-   **phpMyAdmin:** http://localhost:8080
-   **Development Server:** http://localhost:3000
-   **Additional port:** http://localhost:3001
