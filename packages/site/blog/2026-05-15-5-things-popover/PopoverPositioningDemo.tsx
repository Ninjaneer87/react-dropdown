import React, { useState, useRef, useEffect } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import SitePopover from '@site/src/components/site-lab/SitePopover/SitePopover';

type Strategy = 'absolute' | 'fixed';

const triggerBtnStyle: React.CSSProperties = {
  padding: '4px 12px',
  borderRadius: 6,
  border: '1px solid #cbd5e1',
  background: '#fff',
  cursor: 'pointer',
  fontSize: 12,
  fontWeight: 500,
  color: '#334155',
  width: 'fit-content',
};

const popoverElStyle: React.CSSProperties = {
  width: 200,
  padding: '10px 14px',
  background: '#1e293b',
  color: '#e2e8f0',
  borderRadius: 8,
  boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
  fontSize: 13,
  lineHeight: '1.5',
  zIndex: 9999,
};

const labelStyle: React.CSSProperties = {
  fontSize: 11,
  color: '#94a3b8',
  background: 'none',
  border: 'none',
  padding: 0,
};

interface PopoverBoxProps {
  overflow: 'auto' | 'hidden';
  strategy: Strategy;
  note: string;
}

function PopoverBox({ overflow, strategy, note }: PopoverBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!isOpen || strategy !== 'fixed' || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setCoords({ top: rect.bottom + 6, left: rect.left });
  }, [isOpen, strategy]);

  const popoverEl = (
    <div
      style={{
        position: strategy,
        ...(strategy === 'absolute'
          ? { top: '100%', left: 0, marginTop: 6 }
          : { top: coords.top, left: coords.left }),
        ...popoverElStyle,
      }}
    >
      I'm the popover content. Notice how I behave in this container.
    </div>
  );

  const trigger = (
    <div
      style={{
        position: 'relative',
        width: 'fit-content',
      }}
    >
      <button
        ref={triggerRef}
        onClick={() => setIsOpen((o) => !o)}
        style={triggerBtnStyle}
      >
        {isOpen ? 'Close' : 'Open'}
      </button>
      {isOpen && popoverEl}
    </div>
  );

  return (
    <div>
      <div
        style={{
          overflow,
          height: 110,
          border: '1.5px dashed var(--demo-border)',
          borderRadius: 8,
          padding: 12,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <code style={labelStyle}>overflow: {overflow}</code>
          {trigger}
        </div>
      </div>
      <p style={{ fontSize: 12, color: '#64748b', margin: '6px 0 0' }}>{note}</p>
    </div>
  );
}

interface LivePopoverBoxProps {
  overflow: 'auto' | 'hidden';
  note: string;
}

function LivePopoverBox({ overflow, note }: LivePopoverBoxProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div
        style={{
          overflow,
          height: 110,
          border: '1.5px dashed var(--demo-border)',
          borderRadius: 8,
          padding: 12,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <code style={labelStyle}>overflow: {overflow}</code>
          <SitePopover
            isOpen={isOpen}
            onOpenChange={setIsOpen}
            shouldBlockScroll={false}
            shouldCloseOnScroll={false}
          >
            <SitePopover.Trigger>
              <button style={triggerBtnStyle}>
                {isOpen ? 'Close' : 'Open'}
              </button>
            </SitePopover.Trigger>
            <SitePopover.Content>
              <div style={{ fontSize: 13 }}>I'm the popover content.</div>
              <small>I follow the trigger while scrolling!</small>
            </SitePopover.Content>
          </SitePopover>
        </div>
      </div>
      <p style={{ fontSize: 12, color: '#64748b', margin: '6px 0 0' }}>{note}</p>
    </div>
  );
}

interface GroupProps {
  title: string;
  tag: string;
  tagVariant: 'danger' | 'success';
  children: React.ReactNode;
}

function Group({ title, tag, tagVariant, children }: GroupProps) {
  const tagColor = tagVariant === 'danger' ? '#dc2626' : '#16a34a';
  const tagBg = tagVariant === 'danger' ? '#fee2e2' : '#dcfce7';
  const borderColor = tagVariant === 'danger' ? '#fca5a5' : '#86efac';

  return (
    <div
      style={
        {
          '--demo-border': borderColor,
          marginBottom: 24,
        } as React.CSSProperties
      }
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 8,
        }}
      >
        <strong style={{ fontSize: 14 }}>{title}</strong>
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            padding: '1px 8px',
            borderRadius: 4,
            color: tagColor,
            background: tagBg,
            whiteSpace: 'nowrap',
          }}
        >
          {tag}
        </span>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 14,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function PopoverPositioningDemoContent() {
  return (
    <div style={{ marginBlock: 24 }}>
      <Group title="position: absolute" tag="Problem" tagVariant="danger">
        <PopoverBox
          overflow="auto"
          strategy="absolute"
          note="Popover adds extra scrollable area inside the container."
        />
        <PopoverBox
          overflow="hidden"
          strategy="absolute"
          note="Popover gets clipped at the container edge."
        />
      </Group>

      <Group title="position: fixed (no repositioning)" tag="Not enough" tagVariant="danger">
        <PopoverBox
          overflow="auto"
          strategy="fixed"
          note="Open, then scroll the page - popover stays frozen."
        />
        <PopoverBox
          overflow="hidden"
          strategy="fixed"
          note="Escapes overflow, but doesn't track trigger movement."
        />
      </Group>

      <Group
        title="Popover (fixed + portal + repositioning)"
        tag="Full solution"
        tagVariant="success"
      >
        <LivePopoverBox
          overflow="auto"
          note="Open, then scroll the page - popover follows the trigger!"
        />
        <LivePopoverBox
          overflow="hidden"
          note="Escapes overflow and stays anchored to the trigger."
        />
      </Group>
    </div>
  );
}

export default function PopoverPositioningDemo() {
  return (
    <BrowserOnly fallback={<div />}>
      {() => <PopoverPositioningDemoContent />}
    </BrowserOnly>
  );
}
