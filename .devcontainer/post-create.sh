#!/bin/bash

set -e

GREEN="#50fa7b"
PURPLE="#bd93f9"
RED="#ff5555"
CYAN="#8be9fd"

git config --global --add safe.directory /workspaces/${PWD##*/}

git config --global --unset-all user.name || true
git config --global --unset-all user.email || true
git config --global core.editor "nano"

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
    echo "git_local_status() { local upstream ahead behind has_changes; upstream=\$(git rev-parse --abbrev-ref @{upstream} 2>/dev/null); if [[ -n \"\$upstream\" ]]; then ahead=\$(git rev-list --count @{upstream}..HEAD 2>/dev/null || echo 0); behind=\$(git rev-list --count HEAD..@{upstream} 2>/dev/null || echo 0); has_changes=\$(git status --porcelain 2>/dev/null | wc -l); if [[ \$ahead -gt 0 && \$behind -gt 0 ]]; then echo \" %F{$GREEN}+\$ahead %F{$RED}-\$behind\"; elif [[ \$has_changes -gt 0 && \$ahead -eq 0 ]]; then echo \" %F{$GREEN}+1\"; elif [[ \$ahead -gt 0 ]]; then echo \" %F{$GREEN}+\$ahead\"; elif [[ \$behind -gt 0 ]]; then echo \" %F{$RED}-\$behind\"; fi; fi; }" >> ~/.zshrc
    echo "git_upstream_info() { local upstream ahead behind remote has_changes; upstream=\$(git rev-parse --abbrev-ref @{upstream} 2>/dev/null); if [[ -n \"\$upstream\" ]]; then remote=\${upstream%%/*}; ahead=\$(git rev-list --count @{upstream}..HEAD 2>/dev/null || echo 0); behind=\$(git rev-list --count HEAD..@{upstream} 2>/dev/null || echo 0); has_changes=\$(git status --porcelain 2>/dev/null | wc -l); if [[ \$ahead -gt 0 && \$behind -gt 0 ]]; then echo \" %F{$CYAN}(\$remote %F{$RED}-\$ahead %F{$GREEN}+\$behind%F{$CYAN})%f\"; elif [[ \$has_changes -gt 0 && \$ahead -eq 0 ]]; then echo \" %F{$CYAN}(\$remote %F{$RED}-1%F{$CYAN})%f\"; elif [[ \$ahead -gt 0 ]]; then echo \" %F{$CYAN}(\$remote %F{$RED}-\$ahead%F{$CYAN})%f\"; elif [[ \$behind -gt 0 ]]; then echo \" %F{$CYAN}(\$remote %F{$GREEN}+\$behind%F{$CYAN})%f\"; else echo \" %F{$CYAN}(\$remote)%f\"; fi; fi; }" >> ~/.zshrc
    echo "git_arrow_color() { if git rev-parse --git-dir >/dev/null 2>&1; then if [[ -z \"\$(git status --porcelain 2>/dev/null)\" ]]; then echo \"%F{$GREEN}➜%f\"; else echo \"%F{$RED}➜%f\"; fi; else echo \"%F{$GREEN}➜%f\"; fi; }" >> ~/.zshrc
    echo "PROMPT='%F{$GREEN}╭─%f %F{$PURPLE}%n%f \$(git_arrow_color) %F{$PURPLE}%~%f %F{$CYAN}(\$(git_current_branch)\$(git_local_status)%F{$CYAN})%f\$(parse_git_dirty)\$(git_upstream_info)'" >> ~/.zshrc
    echo 'PROMPT="$PROMPT'$'\n''%F{#50fa7b}╰$%f "' >> ~/.zshrc
    echo 'export TERM="xterm-256color"' >> ~/.zshrc
    echo 'export COLORTERM="truecolor"' >> ~/.zshrc
fi

echo "Setup completed."


