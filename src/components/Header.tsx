import { useSession } from "next-auth/react";
import Link from "next/link";

function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-gray-800 text-white shadow-md py-4 w-full fixed top-0 left-0">
      <div className="container mx-auto flex justify-between items-center px-6">
        <h1 className="text-2xl font-bold">DOXA CRM</h1>
        <nav className="space-x-4">
          {session ? (
            <>
              <Link
                href="/"
                className="hover:text-blue-400 transition duration-200"
              >
                Envío de emails
              </Link>
              <Link
                href="/email"
                className="hover:text-blue-400 transition duration-200"
              >
                Ver ejemplo de mail
              </Link>
              <Link
                href="/prospects"
                className="hover:text-blue-400 transition duration-200"
              >
                Prospects
              </Link>
            </>
          ) : (
            <Link
              href="/login"
              className="hover:text-blue-400 transition duration-200"
            >
              Iniciar Sesión
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
