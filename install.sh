#!/usr/bin/env bash
# Sprout Prototyping Workspace installer
# Symlinks pipeline skills into ~/.claude/skills/ for Claude Code

set -euo pipefail

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)

echo ""
echo "Sprout Prototyping Workspace"
echo "============================"
echo ""

mkdir -p "$HOME/.claude/skills"

create_symlink() {
  local target="$1"
  local link="$2"
  [ -L "$link" ] && rm "$link"
  ln -s "$target" "$link"
  echo "  ✓ $(basename "$link")"
}

echo "Installing skills..."
create_symlink "$SCRIPT_DIR/skills/prd-gap-analyzer"     "$HOME/.claude/skills/prd-gap-analyzer"
create_symlink "$SCRIPT_DIR/skills/prd-ux-validator"     "$HOME/.claude/skills/prd-ux-validator"
create_symlink "$SCRIPT_DIR/skills/secondary-research"   "$HOME/.claude/skills/secondary-research"
create_symlink "$SCRIPT_DIR/skills/prototype-agent"      "$HOME/.claude/skills/prototype-agent"
create_symlink "$SCRIPT_DIR/skills/sprout-design-system" "$HOME/.claude/skills/sprout-design-system"

echo ""
echo "Done. Restart Claude Code to load the new skills."
echo ""
echo "Pipeline:"
echo "  1. prd-gap-analyzer    — check PRD completeness"
echo "  2. prd-ux-validator    — validate PRD against research → design brief"
echo "     secondary-research  — research from scratch → design brief"
echo "  3. prototype-agent     — build Vue 3 components from approved brief"
