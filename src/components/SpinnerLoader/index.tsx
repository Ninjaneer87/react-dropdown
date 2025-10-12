const SpinnerLoader = () => {
  return (
    <div className="flex justify-center items-center shrink-0 grow-0">
      <div
        aria-roledescription="Loader"
        role="status"
        aria-live="polite"
        style={{
          animationTimingFunction: 'ease-out',
          animationDuration: '700ms',
        }}
        className="animate-spin rounded-full h-[1em] w-[1em] border-2 border[currentColor] border-t-transparent border-b-transparent border-l-transparent"
      />
    </div>
  );
};

export default SpinnerLoader;
