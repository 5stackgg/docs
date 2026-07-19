# Components

::: warning `@5stack/ui` does not ship components yet
As of `@5stack/ui@0.1.1` the package exports exactly one symbol: `cn()`. The
panel's ~47 shadcn-vue components still live inside the web app and have not been
extracted. You get the design tokens, the Tailwind preset, and the class-merge
helper — you build your own components on top.

They are being moved into the package incrementally. Until then, treat this page
as "how to build components that will match, and migrate cleanly later".
:::

## What the package exports today

| Import                       | What it is                                        |
| ---------------------------- | ------------------------------------------------- |
| `@5stack/ui`                 | Barrel — currently just `cn`                      |
| `@5stack/ui/lib/utils`       | `cn` directly                                     |
| `@5stack/ui/tailwind-plugin-preset` | The preset plugins use ([Styling](/plugins/styling)) |
| `@5stack/ui/plugin.css`      | Tokens + utilities + scoped base rules            |
| `@5stack/ui/standalone.css`  | Global preflight, dev entry only                  |
| `@5stack/ui/tokens.css`      | The design tokens alone (pulled in by plugin.css) |

```ts
import { cn } from "@5stack/ui";
```

`cn` is the canonical shadcn class merger — `clsx` for conditionals, then
`tailwind-merge` to resolve conflicts so a caller's `p-6` beats a component's
default `p-4`:

```ts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Note the package ships **raw TypeScript source**, not built output. Your bundler
transpiles it, which is why your Tailwind `content` array must include
`./node_modules/@5stack/ui/src/**/*.{vue,ts}`.

## Building components that match

The panel uses [shadcn-vue](https://www.shadcn-vue.com/) in the **new-york**
style with base color **zinc**, on top of [reka-ui](https://reka-ui.com)
primitives. Match that and your components will look native — and will be easy to
swap for the official ones later.

The practical approach: copy the component you need from shadcn-vue into your own
`src/components/ui/`, exactly as you would in any shadcn project. The tokens the
copied code expects (`bg-primary`, `text-muted-foreground`, `ring-ring`) are
already defined by the preset, so it works unmodified.

A typical variant component, using `class-variance-authority`:

```vue
<script setup lang="ts">
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@5stack/ui";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-10 px-8",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

const props = defineProps<{
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
  class?: string;
}>();
</script>

<template>
  <button :class="cn(buttonVariants({ variant, size }), props.class)">
    <slot />
  </button>
</template>
```

Accepting a `class` prop and merging it through `cn` is the convention — it is
what lets callers override spacing without `!important`.

### Interactive primitives

For anything with real interaction behavior — dialogs, dropdowns, selects,
tooltips, tabs, popovers — use **reka-ui** directly rather than hand-rolling it.
It is a shared Federation singleton, so you are using the same instance the panel
does, and you inherit its accessibility and focus management:

```vue
<script setup lang="ts">
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
} from "reka-ui";
</script>

<template>
  <DialogRoot>
    <DialogPortal>
      <DialogOverlay class="fixed inset-0 bg-black/60" />
      <DialogContent
        class="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-card p-6 text-card-foreground"
      >
        <slot />
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
```

::: warning Portals escape your scope
`DialogPortal` teleports content to `document.body`, which is outside your
`[data-5stack-plugin]` root — and every utility is scoped to that
[important selector](/plugins/styling#scoping-your-utilities). Put the attribute
on the portalled content too, or its utilities will not apply.
:::

## Icons

`lucide-vue-next` is a shared singleton — use it rather than bundling a second
icon set:

```vue
<script setup lang="ts">
import { Sparkles, Users } from "lucide-vue-next";
</script>

<template>
  <Sparkles class="h-5 w-5 text-primary" />
</template>
```

Size with `h-*`/`w-*` and color with `text-*`; lucide icons use `currentColor`.

Because lucide publishes on `0.x`, a caret range like `^0.508.0` only permits
patch drift — it is effectively an exact pin, and it must be bumped in lockstep
with the panel. See [Module Federation](/plugins/module-federation).

## Dependencies checklist

Everything below is a shared singleton, so install it as a direct dependency and
match the panel's versions:

```json
{
  "dependencies": {
    "@5stack/ui": "^0.1.1",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-vue-next": "^0.508.0",
    "reka-ui": "^2.9.7",
    "tailwind-merge": "^3.2.0",
    "vue": "^3.5.34"
  }
}
```

::: info
`class-variance-authority` is a peer dependency of `@5stack/ui` but is not in the
hello-world sample, because nothing currently exported from the package uses it.
The moment you copy in a `cva`-based component — or the official components land
— you need it. Adding it up front costs nothing.
:::

## What you cannot import

The panel's `components/ui/*` are host-internal and not federated. There is no
import path that reaches them. Anything you see in the panel UI that is not in
`@5stack/ui` is something you reimplement or copy from shadcn-vue.
