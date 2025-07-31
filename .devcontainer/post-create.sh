#!/bin/bash

set -e

GREEN="#50fa7b"
PURPLE="#bd93f9"
RED="#ff5555"
CYAN="#8be9fd"

git config --global --add safe.directory /workspaces/${PWD##*/}

git config --global --unset-all user.name || true
git config --global --unset-all user.email || true

if [ -f "composer.json" ]; then
    composer install --optimize-autoloader
fi

yarn install

yarn prepare

if [ -d "$HOME/.oh-my-zsh" ]; then
    echo "ZSH_THEME_GIT_PROMPT_PREFIX=\" %F{$CYAN}(\"" >> ~/.zshrc
    echo "ZSH_THEME_GIT_PROMPT_SUFFIX=\")%f\"" >> ~/.zshrc
    echo "ZSH_THEME_GIT_PROMPT_DIRTY=\" %F{$RED}✗%f\"" >> ~/.zshrc
    echo "ZSH_THEME_GIT_PROMPT_CLEAN=\" %F{$GREEN}✔%f\"" >> ~/.zshrc
    echo "ZSH_THEME_GIT_PROMPT_AHEAD=\" %F{$GREEN}+%f\"" >> ~/.zshrc
    echo "ZSH_THEME_GIT_PROMPT_BEHIND=\" %F{$RED}-%f\"" >> ~/.zshrc
    echo "git_upstream_info() { local upstream; upstream=\$(git rev-parse --abbrev-ref @{upstream} 2>/dev/null); [[ -n \"\$upstream\" ]] && echo \" %F{$CYAN}(\$upstream)\$(git_remote_status)%f\"; }" >> ~/.zshrc
    echo "git_arrow_color() { if git rev-parse --git-dir >/dev/null 2>&1; then if [[ -z \"\$(git status --porcelain 2>/dev/null)\" ]]; then echo \"%F{$GREEN}➜%f\"; else echo \"%F{$RED}➜%f\"; fi; else echo \"%F{$GREEN}➜%f\"; fi; }" >> ~/.zshrc
    echo "PROMPT='%F{$GREEN}╭─%f %F{$PURPLE}%n%f \$(git_arrow_color) %F{$PURPLE}%~%f %F{$CYAN}(\$(git_current_branch))%f\$(parse_git_dirty)\$(git_upstream_info)'" >> ~/.zshrc
    echo 'PROMPT="$PROMPT'$'\n''%F{#50fa7b}╰$%f "' >> ~/.zshrc
    echo 'export TERM="xterm-256color"' >> ~/.zshrc
    echo 'export COLORTERM="truecolor"' >> ~/.zshrc
fi

echo "Setup completed."
