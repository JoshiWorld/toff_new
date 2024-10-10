export default function Impressum() {
    return (
      <div className="mx-auto text-white grid w-full max-w-7xl gap-4 px-4 py-20 md:px-8 md:py-40">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Impressum
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Christof Dusch
          <br />
          Valentin-Kindlin-Straße 12
          <br />
          86899 Landsberg
          <br />
          Deutschland
          <br />
          <br />
          <a
            href="mailto:toffmgmt@gmx.de"
            className="leading-7 [&:not(:first-child)]:mt-6"
          >
            toffmgmt@gmx.de
          </a>
        </p>
      </div>
    );
}