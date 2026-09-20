export default function BISLogo({ className = 'h-9 w-auto' }: { className?: string }) {
  return (
    <img
      src="/bis_logo.png"
      alt="Bureau of Indian Standards Official Logo"
      width={36}
      height={36}
      className={`${className} object-contain`}
      loading="eager"
    />
  );
}
