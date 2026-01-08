# Text Overlay Proposal: "Technically Creative"

## Current Implementation

The "Technically Creative" text is currently displayed **side-by-side** with the hero image:

```astro
<div class="flex flex-col lg:flex-row gap-4 items-center justify-center">
	<div class="w-full lg:w-2/4 order-2 lg:order-1">
		<h1 class="text-4xl md:text-6xl font-bold leading-none italic uppercase">
			Technically Creative
		</h1>
		<!-- Social links -->
	</div>
	<div class="w-full lg:w-4/4 order-1 lg:order-2">
		<Image src={heroImage} ... />
	</div>
</div>
```

## Proposed Implementation: Text Overlay Effect

### Option 1: Simple Overlay with Backdrop (Recommended)

Place the text **overlapping the image** with a subtle backdrop for readability:

```astro
<div class="relative flex flex-col lg:flex-row gap-4 items-center">
	<!-- Image container with overlay text -->
	<div class="relative w-full lg:w-3/5 order-1">
		<Image
			src={heroImage}
			alt="Greg Barbosa"
			class="w-full h-auto"
			style="clip-path: url(#hero-mask); -webkit-clip-path: url(#hero-mask);"
			loading="eager"
			fetchpriority="high"
		/>
		<!-- Overlay text positioned over image -->
		<h1 class="absolute inset-0 flex items-center justify-center p-8">
			<span
				class="text-4xl md:text-6xl font-bold italic uppercase text-white mix-blend-difference"
			>
				Technically Creative
			</span>
		</h1>
	</div>
	<!-- Social links (keep separate for accessibility) -->
	<div class="w-full lg:w-2/5 order-2">
		<!-- Social links here -->
	</div>
</div>
```

**Benefits:**

- `mix-blend-mode: difference` creates a striking effect that adapts to the image colors
- Text remains readable while integrating with the image
- Maintains the mask effect on the image

### Option 2: Kinetic Typography

Add subtle animation to the text:

```css
.kinetic-text {
	animation: kineticFloat 8s ease-in-out infinite;
	transform-origin: center;
}

@keyframes kineticFloat {
	0%,
	100% {
		transform: translateY(0) rotate(0deg);
	}
	50% {
		transform: translateY(-10px) rotate(1deg);
	}
}
```

### Option 3: Split Layout with Overlap

Have the text "break out" of its container to overlap the image:

```astro
<div class="relative">
	<div class="lg:ml-20 z-10 relative">
		<h1
			class="text-4xl md:text-6xl font-bold italic uppercase bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-4 inline-block"
		>
			Technically Creative
		</h1>
	</div>
	<Image src={heroImage} class="lg:-mt-20" ... />
</div>
```

## Recommendation

**Option 1** is recommended for the best balance of:

- Visual impact
- Accessibility (text remains readable)
- Performance (pure CSS, no JavaScript)
- Mobile responsiveness

## Implementation Steps

1. Update `src/pages/index.astro` with the overlay structure
2. Add responsive utilities for positioning
3. Test readability across different image backgrounds
4. Verify accessibility with screen readers

## Accessibility Considerations

- Keep the text contrast high (use `mix-blend-mode: difference` or add backdrop)
- Ensure text is programmatically visible (not just visually on top of image)
- Test with screen readers to announce the heading properly
