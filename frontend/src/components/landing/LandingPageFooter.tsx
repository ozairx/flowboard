'use client';

const LandingPageFooter = () => {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <div className="container mx-auto flex items-center justify-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Flowboard. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
};

export default LandingPageFooter;
