> Revised from claude-config/rules/design-system.md

# Design System Rules

## Token Enforcement

When working in any project that uses Sprout/Toge Design System:

1. **Before writing any color, spacing, or shadow value** — check `package.json` for `@toge-design-system/toge` or `design-system-next`.

2. **Never use hardcoded values** when a design token exists:
   - ❌ `text-[#262B2B]`, `bg-[#F5F6F6]`, `border-[#D9DEDE]`
   - ✅ Use token classes from `get_tokens` MCP call

3. **Use MCP to discover tokens before styling:**
   - Call `mcp__design-system-next__get_tokens` with `type: "colors"` and `type: "utilities"`
   - Map every color to its token equivalent before writing a class

4. **Treat raw hex in Tailwind arbitrary syntax as a violation** — flag and replace on sight.

5. **When no token exists**, leave a comment explaining why the raw value is intentional.
