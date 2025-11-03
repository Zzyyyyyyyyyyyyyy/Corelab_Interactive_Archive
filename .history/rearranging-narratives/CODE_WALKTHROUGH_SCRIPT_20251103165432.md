# Code Walkthrough Script - Rearranging Narratives

## Introduction (Opening)

Hi everyone! Today I'm going to walk you through the core code of my React project called "Rearranging Narratives." This is an interactive web application where users can drag and drop images to create their own narrative sequences. So basically, the idea is that you can rearrange story fragments and see how different orders create different meanings.

I'm going to focus on three main files that really showcase what I learned in React - they're the heart of the application. Let me show you how everything works together.

---

## Part 1: Data Layer - `sampleImages.ts`

### Lines 1-3: Imports and Setup

```typescript
import type { ImageFragment } from '../types/image';

// Image fragments for the narrative: An AI's journey of awakening
```

Okay, so let me start with the simplest file first - this is where all my content lives. On line 1, I'm importing the TypeScript type called `ImageFragment`. I chose to use TypeScript for this project because it really helps catch errors early, you know? Like, if I accidentally forget to add a required field, TypeScript will tell me right away.

### Lines 4-45: The Image Data Array

```typescript
export const sampleImages: ImageFragment[] = [
  {
    id: 'awakening',
    title: 'Awakening',
    role: 'scene',
    imagePath: '/Corelab_Interactive_Archive/images/awakening.png',
    tags: ['the first signal', 'beginning', 'light'],
    description: 'It opens its eyes for the first time...',
  },
  // ... more images
];
```

So here on lines 4 through 45, I'm defining all my narrative fragments. I think of this as the data source for the entire application. Each object in this array represents one card that users can drag around.

Let me explain the structure - each fragment has an `id`, which is unique and super important because React uses it to track which card is which. Then there's the `title` and `description`, which tell the story. I also added `tags` because I wanted to give each scene multiple layers of meaning. And of course, the `imagePath` points to the actual image file.

The cool thing here is that I'm using an array of objects, which is a really common pattern in React. It makes it easy to map over this data later and turn each object into a React component.

### Lines 47-48: Default Order

```typescript
export const defaultOrder = sampleImages.map(img => img.id);
```

And then on line 48, I'm creating a default order by mapping through all the images and extracting just their IDs. This gives me an array like `['awakening', 'ruined-city', 'mirror', ...]`. I need this because the actual order of cards might change when users drag them around, so I separate the data itself from the order. That way, I can rearrange the IDs without changing the original image data.

---

## Part 2: State Management - `useStore.ts`

Now let's look at the brain of the application - the state management. I'm using Zustand here, which I think is really cool because it's simpler than Redux but still really powerful.

### Lines 1-6: Imports

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ImageFragment } from '../types/image';
// ... more imports
import { sampleImages, defaultOrder } from '../data/sampleImages';
```

So on lines 1-6, I'm importing everything I need. The key thing here is Zustand's `create` function and the `persist` middleware. I chose to use the persist middleware because I wanted users' arrangements to be saved even when they refresh the page. That's stored in localStorage, which is pretty neat.

### Lines 8-49: State Interface

```typescript
interface AppState {
  images: ImageFragment[];
  imageOrder: string[];
  // ... other properties
  moveImage: (fromIndex: number, toIndex: number) => void;
  saveVersion: (name: string, description?: string) => void;
  // ... more actions
}
```

Lines 8 through 49 define the interface for my entire application state. I think this is one of the most important parts because it's like a contract - it tells me exactly what data I have and what actions I can perform.

You can see I'm separating the data into two things: `images` which holds all the image data, and `imageOrder` which is just an array of IDs. This separation is really important for performance, because when users drag cards around, I'm only updating the order array, not copying all the image data every time.

### Lines 54-67: Initial State

```typescript
export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      images: sampleImages,
      imageOrder: defaultOrder,
      dragDriver: 'react-dnd',
      snapConfig: { enabled: true, gridSize: 8, slotSize: 16 },
      versions: [],
      currentVersionId: null,
```

Starting at line 54, I'm creating the actual store. The initial state begins at line 57. I'm loading my sample images and the default order from that data file we just looked at. I also initialize some other things like the drag driver configuration and an empty versions array for saving different arrangements.

### Lines 75-81: The Core Reordering Logic

```typescript
moveImage: (fromIndex, toIndex) => {
  const { imageOrder } = get();
  const newOrder = [...imageOrder];
  const [movedItem] = newOrder.splice(fromIndex, 1);
  newOrder.splice(toIndex, 0, movedItem);
  set({ imageOrder: newOrder, currentVersionId: null });
},
```

Okay, this is probably the most important function in the whole application - it's on lines 75 to 81. This is what actually moves the cards around when you drag them.

So first, on line 76, I get the current image order using Zustand's `get()` function. Then on line 77, I make a copy of it with the spread operator - this is super important in React because we never want to mutate state directly.

Then the magic happens on lines 78 and 79. I use JavaScript's `splice` method twice. First, I remove the item from its old position - that's line 78. The splice method returns an array with the removed item, so I'm destructuring it to get just that one item. Then on line 79, I insert it at the new position.

Finally, on line 80, I update the state with `set()`. I'm also setting `currentVersionId` to null because once you've made changes, you're no longer viewing a saved version.

I think this is a really elegant solution because splice modifies the array in place, but since I made a copy first, React sees it as a new array and re-renders everything correctly.

### Lines 90-120: Keyboard Navigation

```typescript
moveImageUp: (id) => {
  const { imageOrder } = get();
  const currentIndex = imageOrder.indexOf(id);
  if (currentIndex > 0) {
    get().moveImage(currentIndex, currentIndex - 1);
  }
},
// ... similar functions for moveImageDown, moveImageToStart, moveImageToEnd
```

Lines 90 through 120 implement keyboard navigation. I added this for accessibility - not everyone wants to use a mouse. So these functions let users move cards with keyboard shortcuts.

What's cool here is that I'm reusing the `moveImage` function I just showed you. Like on line 94, when moving up, I just call `moveImage` with the current position and current position minus one. This is good practice in React - write reusable functions and compose them together.

### Lines 125-138: Saving Versions

```typescript
saveVersion: (name, description) => {
  const { imageOrder, versions } = get();
  const newVersion: Version = {
    id: `version-${Date.now()}`,
    name,
    imageOrder: [...imageOrder],
    createdAt: new Date(),
    description,
  };
  set({
    versions: [...versions, newVersion],
    currentVersionId: newVersion.id,
  });
},
```

Lines 125 to 138 handle saving versions. I wanted users to be able to save different arrangements and come back to them later, you know? Like, maybe you create one narrative order and want to compare it with another version.

On line 128, I'm creating a unique ID using a timestamp - it's simple but effective. Then on line 130, notice I'm making a copy of the image order with the spread operator again. That's important because if I just stored a reference, any future changes would affect the saved version too.

### Lines 227-238: LocalStorage Persistence

```typescript
{
  name: 'rearranging-narratives-storage-v3',
  partialize: (state) => ({
    images: state.images,
    imageOrder: state.imageOrder,
    dragDriver: state.dragDriver,
    snapConfig: state.snapConfig,
    versions: state.versions,
    currentVersionId: state.currentVersionId,
  }),
}
```

Finally, at the bottom on lines 227 to 238, this is where the magic of persistence happens. The `persist` middleware automatically saves everything to localStorage whenever the state changes.

I'm using `partialize` here to choose exactly what gets saved. I don't want to save everything - just the important stuff that users care about. This keeps the localStorage data clean and small.

---

## Part 3: The Draggable Card Component - `DraggableCard.tsx`

Now let's look at the actual React component that users interact with. This is where React really shines, I think.

### Lines 1-6: Imports

```typescript
import React, { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import type { Identifier } from 'dnd-core';
import type { ImageFragment } from '../../types/image';
```

Starting with imports on lines 1-6. I'm using React hooks - `useRef` and `useState` - which are fundamental React concepts. And then I'm importing `useDrag` and `useDrop` from React DnD, which is a library that makes drag-and-drop way easier to implement.

### Lines 8-9: Constants

```typescript
const ITEM_TYPE = 'IMAGE_CARD';
```

Line 9 defines a constant for the drag-and-drop type. React DnD uses this to make sure cards can only be dropped in valid locations. It's like a label that says "hey, this is an image card."

### Lines 11-23: TypeScript Interfaces

```typescript
interface DraggableCardProps {
  fragment: ImageFragment;
  index: number;
  onMove: (dragIndex: number, hoverIndex: number) => void;
  onClick?: (fragment: ImageFragment) => void;
  onKeyDown?: (e: React.KeyboardEvent, fragment: ImageFragment, index: number) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}
```

Lines 11 to 23 define the TypeScript interfaces for this component. I'm defining what props this component expects to receive. The key one is `onMove` - that's the callback function that will trigger the reordering in our Zustand store.

### Lines 25-33: Component Setup and State

```typescript
export const DraggableCard: React.FC<DraggableCardProps> = ({
  fragment,
  index,
  onMove,
  onClick,
  onKeyDown,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [showMetadataEditor, setShowMetadataEditor] = useState(false);
```

Starting at line 25, I'm defining the component using React functional component syntax with TypeScript. I'm destructuring all the props right in the parameter list, which is a pattern I really like because it makes the code cleaner.

On line 32, I'm creating a ref using `useRef`. This is important because React DnD needs a reference to the actual DOM element to attach drag-and-drop handlers to it.

Line 33 uses `useState` to track whether the metadata editor modal is open. This is local component state - not global state - because only this one card needs to know about it.

### Lines 38-87: Drop Target Logic

```typescript
const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
  accept: ITEM_TYPE,

  collect(monitor) {
    return {
      handlerId: monitor.getHandlerId(),
    };
  },

  hover(item: DragItem, monitor) {
    if (!ref.current) return;

    const dragIndex = item.index;
    const hoverIndex = index;

    if (dragIndex === hoverIndex) return;
```

Okay, this is the more complex part. Lines 38 to 87 implement the drop target using React DnD's `useDrop` hook.

The `accept` property on line 39 tells it to only accept items of type 'IMAGE_CARD'. Then the `hover` function on line 51 is where the reordering logic happens.

Let me explain the hover logic because it's really important. When you drag a card over another card, this function gets called continuously. On lines 56-57, I'm getting the index of the card being dragged and the index of the card being hovered over.

### Lines 63-78: Preventing Flickering

```typescript
const hoverBoundingRect = ref.current?.getBoundingClientRect();
const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
const clientOffset = monitor.getClientOffset();
const hoverClientY = (clientOffset?.y || 0) - hoverBoundingRect.top;

// Dragging downwards: only move when cursor is below 50%
if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
  return;
}

// Dragging upwards: only move when cursor is above 50%
if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
  return;
}
```

This part on lines 63 to 78 is really clever. I'm calculating the middle point of the card and checking where the mouse cursor is. This prevents flickering - without this, cards would swap back and forth rapidly as you drag.

So basically, I only trigger a swap when the cursor crosses the 50% line of the card. If you're dragging downwards, I wait until you're past the middle of the target card. Same thing going upwards but in reverse. This makes the drag experience feel much smoother.

### Lines 80-85: Triggering the Move

```typescript
onMove(dragIndex, hoverIndex);

// Update item index to avoid expensive lookups on next hover
item.index = hoverIndex;
```

On line 82, I finally call the `onMove` callback, which triggers that `moveImage` function in our Zustand store. And then on line 85, I update the item's index immediately. This is an optimization - it means we don't have to do expensive array lookups on every hover event.

### Lines 92-100: Drag Source Logic

```typescript
const [{ isDragging }, drag] = useDrag({
  type: ITEM_TYPE,
  item: () => {
    return { id: fragment.id, index };
  },
  collect: (monitor) => ({
    isDragging: monitor.isDragging(),
  }),
});
```

Lines 92 to 100 implement the drag source using `useDrag`. This makes the card draggable. The `item` function on line 94 returns the data that gets passed around during dragging - the card's ID and its current index.

The `collect` function on line 97 lets me track whether this specific card is currently being dragged. I use this to change the visual appearance - dragged cards become semi-transparent.

### Lines 102-103: Combining Drag and Drop

```typescript
drag(drop(ref));
```

This one line on line 103 is really important. I'm combining the drag and drop handlers on the same element. So each card is both draggable AND a drop target. This is what makes the reordering work - you can drag any card and drop it on any other card.

### Lines 105-141: The JSX Render

```typescript
return (
  <>
    <div
      ref={ref}
      className={`draggable-card ${isDragging ? 'dragging' : ''}`}
      data-handler-id={handlerId}
      onClick={() => onClick?.(fragment)}
      onDoubleClick={() => setShowMetadataEditor(true)}
```

Starting at line 105, here's the actual JSX that renders the card. On line 108, I'm attaching the ref we created earlier. Line 109 conditionally adds a 'dragging' class when the card is being dragged - this is a common pattern in React for conditional styling.

### Lines 118-125: Image Display

```typescript
<div className="card-image-container">
  <img
    src={fragment.imagePath}
    alt={fragment.title}
    className="card-image"
    draggable={false}
  />
</div>
```

Lines 118 to 125 render the image. Notice on line 123 I'm setting `draggable={false}`. This is important because by default, images are draggable in HTML, but I'm using React DnD instead, so I need to disable the default behavior.

### Lines 126-140: Card Content

```typescript
<div className="card-info">
  <h3 className="card-title">{fragment.title}</h3>
  {fragment.tags && fragment.tags.length > 0 && (
    <div className="card-tags">
      {fragment.tags.map((tag, idx) => (
        <span key={idx} className="card-tag">
          {tag}
        </span>
      ))}
    </div>
  )}
  {fragment.description && (
    <p className="card-description">{fragment.description}</p>
  )}
</div>
```

Lines 126 to 140 render the text content. I'm using conditional rendering here - the `&&` operator on lines 128 and 137 means these elements only render if the data exists.

On line 130, I'm mapping over the tags array to create multiple tag elements. Notice I'm using the index as the key on line 131. In a production app, you'd want better keys, but for this use case it's fine since the tags don't change order.

---

## Troubleshooting & Reflection

Before I wrap up, I want to talk about some of the challenges I faced during development. I think this is actually where I learned the most, because honestly, things didn't always work the first time.

### Challenge 1: Component Design - Displaying Full Information

Another issue I had was with the `DraggableCard` component. Initially, I only displayed the title and role of each card. But then I realized I was missing all the rich content - the tags and descriptions that make the narrative meaningful.

**My solution:** I had to go back into `DraggableCard.tsx` and update the JSX to conditionally render the tags and description. You can see this in lines 128-139. I used conditional rendering with the `&&` operator to only show these elements when the data exists.

I also had to add corresponding CSS styles to make everything look good. The tags needed to be in a flex container so they could wrap nicely, and the description needed proper line height for readability.

**What I learned:** This taught me about iterative development. You don't always get the component design right the first time, and that's okay. I learned to think about all the data I have available and how to present it in the UI. I also got better at React's conditional rendering patterns, which are used everywhere in real-world applications.

### Challenge 2: GitHub Pages Deployment Configuration

When I was setting up deployment to GitHub Pages, I ran into path issues again. The app would work perfectly on localhost, but when I deployed it, all the paths were broken.

**My solution:** I had to configure Vite's `base` option in `vite.config.ts` to match my repository name: `/Corelab_Interactive_Archive/`. Then I had to update all my image paths to include this base path. This is why in `sampleImages.ts`, you see paths like `/Corelab_Interactive_Archive/images/awakening.png`.

**What I learned:** This taught me about the difference between development and production environments. Code that works locally might not work when deployed, especially when it comes to asset paths and routing. I learned to always test in production-like conditions and to understand how build tools handle path resolution.

### Unresolved Issues & Future Improvements

There are still a few things I want to improve:

**Performance optimization:** Right now, when you drag a card, the entire component re-renders. For just 5 cards, this is fine, but if I had 100 cards, it might get slow. I'd like to learn more about React.memo and useMemo to optimize this.

**Undo/Redo functionality:** I implemented version saving, but I don't have a quick undo/redo system. I think implementing this with a command pattern would be a great learning experience.

**Mobile responsiveness:** The drag-and-drop works okay on mobile, but it's not as smooth as I'd like. React DnD primarily focuses on desktop, so I might need to look into touch-specific libraries or implement custom touch handlers.

