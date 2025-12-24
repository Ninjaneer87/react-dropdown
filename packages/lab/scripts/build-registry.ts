import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REGISTRY_DIR = path.resolve(__dirname, '../registry');
const SRC_DIR = path.resolve(__dirname, '../src');

interface RegistryFile {
  path: string;
  type: string;
  content: string;
  target: string;
}

interface RegistryItem {
  $schema: string;
  name: string;
  type: string;
  title: string;
  description: string;
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  files: RegistryFile[];
}

const BASE_URL = 'https://raw.githubusercontent.com/Ninjaneer87/react-dropdown/main/packages/lab/registry';

type RegistryItemConfig = {
  name: string;
  type: string;
  title: string;
  description: string;
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  files: { src: string; target: string }[];
};

const registryItems: RegistryItemConfig[] = [
  {
    name: 'dropdown',
    type: 'registry:ui',
    title: 'Dropdown',
    description: 'A fully-featured dropdown component with nested menus, sections, and keyboard navigation.',
    dependencies: ['clsx', 'tailwind-merge'],
    registryDependencies: [`${BASE_URL}/popover.json`],
    files: [
      { src: 'components/Dropdown/Dropdown.tsx', target: 'components/ui/dropdown/Dropdown.tsx' },
      { src: 'components/Dropdown/DropdownMenu.tsx', target: 'components/ui/dropdown/DropdownMenu.tsx' },
      { src: 'components/Dropdown/DropdownItem.tsx', target: 'components/ui/dropdown/DropdownItem.tsx' },
      { src: 'components/Dropdown/DropdownTrigger.tsx', target: 'components/ui/dropdown/DropdownTrigger.tsx' },
      { src: 'components/Dropdown/DropdownHeader.tsx', target: 'components/ui/dropdown/DropdownHeader.tsx' },
      { src: 'components/Dropdown/DropdownFooter.tsx', target: 'components/ui/dropdown/DropdownFooter.tsx' },
      { src: 'components/Dropdown/DropdownSection.tsx', target: 'components/ui/dropdown/DropdownSection.tsx' },
      { src: 'components/Dropdown/DropdownDivider.tsx', target: 'components/ui/dropdown/DropdownDivider.tsx' },
      { src: 'components/Dropdown/index.ts', target: 'components/ui/dropdown/index.ts' },
      { src: 'context/DropdownContext.ts', target: 'components/ui/dropdown/context/DropdownContext.ts' },
      { src: 'context/DropdownMenuContext.ts', target: 'components/ui/dropdown/context/DropdownMenuContext.ts' },
      { src: 'components/utility/Slot/index.tsx', target: 'components/ui/dropdown/utility/Slot.tsx' },
      { src: 'utils/elements.tsx', target: 'components/ui/dropdown/utils/elements.tsx' },
      { src: 'utils/common.ts', target: 'components/ui/dropdown/utils/common.ts' },
      { src: 'types.ts', target: 'components/ui/dropdown/types.ts' },
    ],
  },
  {
    name: 'popover',
    type: 'registry:ui',
    title: 'Popover',
    description: 'A flexible popover component with positioning, focus trap, and scroll handling.',
    dependencies: ['clsx', 'tailwind-merge'],
    files: [
      { src: 'components/Popover/Popover.tsx', target: 'components/ui/popover/Popover.tsx' },
      { src: 'components/Popover/PopoverContent.tsx', target: 'components/ui/popover/PopoverContent.tsx' },
      { src: 'components/Popover/PopoverTrigger.tsx', target: 'components/ui/popover/PopoverTrigger.tsx' },
      { src: 'components/Popover/PopoverFocusTrapper.tsx', target: 'components/ui/popover/PopoverFocusTrapper.tsx' },
      { src: 'components/Popover/index.ts', target: 'components/ui/popover/index.ts' },
      { src: 'context/PopoverContext.ts', target: 'components/ui/popover/context/PopoverContext.ts' },
      { src: 'context/PopoverRootContext.ts', target: 'components/ui/popover/context/PopoverRootContext.ts' },
      { src: 'hooks/useFocusTrap.ts', target: 'hooks/useFocusTrap.ts' },
      { src: 'hooks/usePreventBodyScroll.ts', target: 'hooks/usePreventBodyScroll.ts' },
      { src: 'hooks/usePositionObserver.ts', target: 'hooks/usePositionObserver.ts' },
      { src: 'hooks/useDelayUnmount.ts', target: 'hooks/useDelayUnmount.ts' },
      { src: 'hooks/useResizeObserver.ts', target: 'hooks/useResizeObserver.ts' },
      { src: 'hooks/useWindowResize.ts', target: 'hooks/useWindowResize.ts' },
      { src: 'utils/common.ts', target: 'components/ui/popover/utils/common.ts' },
      { src: 'types.ts', target: 'components/ui/popover/types.ts' },
    ],
  },
  {
    name: 'select',
    type: 'registry:ui',
    title: 'Select',
    description: 'A customizable select component with search, sections, and keyboard navigation.',
    dependencies: ['clsx', 'tailwind-merge'],
    registryDependencies: [`${BASE_URL}/popover.json`],
    files: [
      { src: 'components/Select/Select.tsx', target: 'components/ui/select/Select.tsx' },
      { src: 'components/Select/SelectItem.tsx', target: 'components/ui/select/SelectItem.tsx' },
      { src: 'components/Select/SelectSearch.tsx', target: 'components/ui/select/SelectSearch.tsx' },
      { src: 'components/Select/SelectSection.tsx', target: 'components/ui/select/SelectSection.tsx' },
      { src: 'components/Select/SelectDivider.tsx', target: 'components/ui/select/SelectDivider.tsx' },
      { src: 'components/Select/Select.module.css', target: 'components/ui/select/Select.module.css' },
      { src: 'components/Select/index.ts', target: 'components/ui/select/index.ts' },
      { src: 'context/SelectContext.ts', target: 'components/ui/select/context/SelectContext.ts' },
      { src: 'context/SelectMenuContext.ts', target: 'components/ui/select/context/SelectMenuContext.ts' },
      { src: 'types.ts', target: 'components/ui/select/types.ts' },
    ],
  },
];

function buildRegistry() {
  // Ensure registry directory exists
  if (!fs.existsSync(REGISTRY_DIR)) {
    fs.mkdirSync(REGISTRY_DIR, { recursive: true });
  }

  for (const item of registryItems) {
    const registryItem: RegistryItem = {
      $schema: 'https://ui.shadcn.com/schema/registry-item.json',
      name: item.name,
      type: item.type,
      title: item.title,
      description: item.description,
      dependencies: item.dependencies,
      registryDependencies: item.registryDependencies,
      files: item.files.map((file) => {
        const srcPath = path.join(SRC_DIR, file.src);
        let content = '';
        
        if (fs.existsSync(srcPath)) {
          content = fs.readFileSync(srcPath, 'utf-8');
        } else {
          console.warn(`Warning: File not found: ${srcPath}`);
        }

        return {
          path: file.target,
          type: item.type,
          target: file.target,
          content,
        };
      }),
    };

    const outputPath = path.join(REGISTRY_DIR, `${item.name}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(registryItem, null, 2));
    console.log(`Generated: ${outputPath}`);
  }

  // Generate index file listing all items
  const index = {
    $schema: 'https://ui.shadcn.com/schema/registry.json',
    name: '@andrejground/lab',
    homepage: 'https://github.com/Ninjaneer87/react-dropdown',
    items: registryItems.map((item) => ({
      name: item.name,
      type: item.type,
      title: item.title,
      description: item.description,
      dependencies: item.dependencies,
      registryDependencies: item.registryDependencies,
    })),
  };

  fs.writeFileSync(path.join(REGISTRY_DIR, 'index.json'), JSON.stringify(index, null, 2));
  console.log('Generated: registry/index.json');
}

buildRegistry();
