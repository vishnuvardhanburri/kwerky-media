type RoutePlaceholderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

const RoutePlaceholder = ({
  eyebrow,
  title,
  description,
}: RoutePlaceholderProps) => {
  return (
    <main className="min-h-screen bg-black px-4 pb-24 pt-36 text-white sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <p className="font-general text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-white/50">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-4xl font-sans text-4xl font-medium tracking-tight text-white sm:text-5xl md:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-3xl font-robert-regular text-lg leading-8 text-white/68">
          {description}
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            'Sharper structure',
            'Premium presentation',
            'Clear next step',
          ].map((item) => (
            <div
              key={item}
              className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6"
            >
              <p className="font-sans text-xl font-medium tracking-tight text-white">
                {item}
              </p>
              <p className="mt-3 font-robert-regular text-sm leading-7 text-white/60">
                This route is ready for the final content pass and keeps the
                same visual system as the homepage.
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default RoutePlaceholder;
