import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Calendar, History, Users } from "lucide-react"
import ProximoPartido from "@/components/proximo-partido"
import ResultadosRecientes from "@/components/resultados-recientes"
import HistorialPartidos from "@/components/historial-partidos"
import EstadisticasJugadores from "@/components/estadisticas-jugadores"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Trophy className="h-6 w-6" />
            <h1 className="text-xl font-bold">Rastreador de Partidos</h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#proximo" className="text-sm font-medium hover:underline underline-offset-4">
              Próximo Partido
            </Link>
            <Link href="#resultados" className="text-sm font-medium hover:underline underline-offset-4">
              Resultados
            </Link>
            <Link href="#historial" className="text-sm font-medium hover:underline underline-offset-4">
              Historial
            </Link>
            <Link href="#jugadores" className="text-sm font-medium hover:underline underline-offset-4">
              Jugadores
            </Link>
          </nav>
          <Button variant="outline" size="sm" className="md:hidden">
            Menú
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="container py-6 md:py-10">
          <Tabs defaultValue="proximo" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="proximo" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Próximo</span>
              </TabsTrigger>
              <TabsTrigger value="resultados" className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                <span className="hidden sm:inline">Resultados</span>
              </TabsTrigger>
              <TabsTrigger value="historial" className="flex items-center gap-2">
                <History className="h-4 w-4" />
                <span className="hidden sm:inline">Historial</span>
              </TabsTrigger>
              <TabsTrigger value="jugadores" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Jugadores</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="proximo" id="proximo">
              <ProximoPartido />
            </TabsContent>
            <TabsContent value="resultados" id="resultados">
              <ResultadosRecientes />
            </TabsContent>
            <TabsContent value="historial" id="historial">
              <HistorialPartidos />
            </TabsContent>
            <TabsContent value="jugadores" id="jugadores">
              <EstadisticasJugadores />
            </TabsContent>
          </Tabs>
        </section>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Rastreador de Partidos. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Términos
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Privacidad
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Contacto
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
