import Image from 'next/image';

export default function StateEmblem({ className = 'h-10 w-auto' }: { className?: string }) {
  return (
    <img
      src="/emblem.png"
      alt="State Emblem of India (Lion Capital of Ashoka with सत्यमेव जयते)"
      width={40}
      height={44}
      className={`${className} object-contain`}
      loading="eager"
    />
  );
}
