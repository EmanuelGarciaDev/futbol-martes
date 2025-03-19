"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PlusCircle, Star, User } from "lucide-react"

type Jugador = {
  id: string
  nombre: string
  equipo: string
  posicion: string
  goles: number
  asistencias: number
  valoracion: number
  partidos: number
}

export default function EstadisticasJugadores() {
  const [jugadores, setJugadores] = useState<Jugador[]>([])
  const [nuevoJugador, setNuevoJugador] = useState({
    nombre: "",
    equipo: "Equipo A",
    posicion: "Delantero",
    goles: 0,
    asistencias: 0,
    valoracion: 0,
    partidos: 0,
  })
  const [jugadorSeleccionado, setJugadorSeleccionado] = useState<Jugador | null>(null)
  const [dialogoAbierto, setDialogoAbierto] = useState(false)

  useEffect(() => {
    const jugadoresGuardados = localStorage.getItem("jugadores")
    if (jugadoresGuardados) {
      setJugadores(JSON.parse(jugadoresGuardados))
    }
  }, [])

  const guardarJugador = () => {
    const nuevoId = Date.now().toString()
    const jugador = {
      id: nuevoId,
      ...nuevoJugador,
    }

    const nuevosJugadores = [...jugadores, jugador]
    setJugadores(nuevosJugadores)
    localStorage.setItem("jugadores", JSON.stringify(nuevosJugadores))

    // Resetear el formulario
    setNuevoJugador({
      nombre: "",
      equipo: "Equipo A",
      posicion: "Delantero",
      goles: 0,
      asistencias: 0,
      valoracion: 0,
      partidos: 0,
    })

    setDialogoAbierto(false)
  }

  const actualizarEstadisticas = (id: string, campo: string, valor: number) => {
    const nuevosJugadores = jugadores.map((jugador) => {
      if (jugador.id === id) {
        return { ...jugador, [campo]: valor }
      }
      return jugador
    })

    setJugadores(nuevosJugadores)
    localStorage.setItem("jugadores", JSON.stringify(nuevosJugadores))
  }

  const jugadoresEquipoA = jugadores.filter((j) => j.equipo === "Equipo A")
  const jugadoresEquipoB = jugadores.filter((j) => j.equipo === "Equipo B")

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Estadísticas de Jugadores</CardTitle>
            <CardDescription>Seguimiento del rendimiento individual</CardDescription>
          </div>
          <Dialog open={dialogoAbierto} onOpenChange={setDialogoAbierto}>
            <DialogTrigger asChild>
              <Button size="sm" className="flex items-center gap-1">
                <PlusCircle className="h-4 w-4" />
                <span>Nuevo Jugador</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Añadir Nuevo Jugador</DialogTitle>
                <DialogDescription>Completa la información del jugador para añadirlo al registro.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input
                    id="nombre"
                    value={nuevoJugador.nombre}
                    onChange={(e) => setNuevoJugador({ ...nuevoJugador, nombre: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="equipo">Equipo</Label>
                    <Select
                      value={nuevoJugador.equipo}
                      onValueChange={(value) => setNuevoJugador({ ...nuevoJugador, equipo: value })}
                    >
                      <SelectTrigger id="equipo">
                        <SelectValue placeholder="Seleccionar equipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Equipo A">Equipo A</SelectItem>
                        <SelectItem value="Equipo B">Equipo B</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="posicion">Posición</Label>
                    <Select
                      value={nuevoJugador.posicion}
                      onValueChange={(value) => setNuevoJugador({ ...nuevoJugador, posicion: value })}
                    >
                      <SelectTrigger id="posicion">
                        <SelectValue placeholder="Seleccionar posición" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Portero">Portero</SelectItem>
                        <SelectItem value="Defensa">Defensa</SelectItem>
                        <SelectItem value="Centrocampista">Centrocampista</SelectItem>
                        <SelectItem value="Delantero">Delantero</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogoAbierto(false)}>
                  Cancelar
                </Button>
                <Button onClick={guardarJugador}>Guardar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="equipoA" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="equipoA">Equipo A</TabsTrigger>
            <TabsTrigger value="equipoB">Equipo B</TabsTrigger>
          </TabsList>
          <TabsContent value="equipoA">
            {jugadoresEquipoA.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Jugador</TableHead>
                      <TableHead>Posición</TableHead>
                      <TableHead className="text-center">PJ</TableHead>
                      <TableHead className="text-center">Goles</TableHead>
                      <TableHead className="text-center">Asist.</TableHead>
                      <TableHead className="text-center">Valoración</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jugadoresEquipoA.map((jugador) => (
                      <TableRow key={jugador.id}>
                        <TableCell className="font-medium">{jugador.nombre}</TableCell>
                        <TableCell>{jugador.posicion}</TableCell>
                        <TableCell className="text-center">{jugador.partidos}</TableCell>
                        <TableCell className="text-center">{jugador.goles}</TableCell>
                        <TableCell className="text-center">{jugador.asistencias}</TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <span className="ml-1">{jugador.valoracion.toFixed(1)}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => setJugadorSeleccionado(jugador)}>
                            Editar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <User className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No hay jugadores registrados</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Añade jugadores al Equipo A para ver sus estadísticas aquí.
                </p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="equipoB">
            {jugadoresEquipoB.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Jugador</TableHead>
                      <TableHead>Posición</TableHead>
                      <TableHead className="text-center">PJ</TableHead>
                      <TableHead className="text-center">Goles</TableHead>
                      <TableHead className="text-center">Asist.</TableHead>
                      <TableHead className="text-center">Valoración</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jugadoresEquipoB.map((jugador) => (
                      <TableRow key={jugador.id}>
                        <TableCell className="font-medium">{jugador.nombre}</TableCell>
                        <TableCell>{jugador.posicion}</TableCell>
                        <TableCell className="text-center">{jugador.partidos}</TableCell>
                        <TableCell className="text-center">{jugador.goles}</TableCell>
                        <TableCell className="text-center">{jugador.asistencias}</TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <span className="ml-1">{jugador.valoracion.toFixed(1)}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => setJugadorSeleccionado(jugador)}>
                            Editar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <User className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No hay jugadores registrados</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Añade jugadores al Equipo B para ver sus estadísticas aquí.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {jugadorSeleccionado && (
          <Dialog open={!!jugadorSeleccionado} onOpenChange={(open) => !open && setJugadorSeleccionado(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Actualizar Estadísticas</DialogTitle>
                <DialogDescription>Actualiza las estadísticas de {jugadorSeleccionado.nombre}</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="partidos">Partidos Jugados</Label>
                    <Input
                      id="partidos"
                      type="number"
                      min="0"
                      value={jugadorSeleccionado.partidos}
                      onChange={(e) =>
                        setJugadorSeleccionado({
                          ...jugadorSeleccionado,
                          partidos: Number.parseInt(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="goles">Goles</Label>
                    <Input
                      id="goles"
                      type="number"
                      min="0"
                      value={jugadorSeleccionado.goles}
                      onChange={(e) =>
                        setJugadorSeleccionado({
                          ...jugadorSeleccionado,
                          goles: Number.parseInt(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="asistencias">Asistencias</Label>
                    <Input
                      id="asistencias"
                      type="number"
                      min="0"
                      value={jugadorSeleccionado.asistencias}
                      onChange={(e) =>
                        setJugadorSeleccionado({
                          ...jugadorSeleccionado,
                          asistencias: Number.parseInt(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="valoracion">Valoración (0-10)</Label>
                    <Input
                      id="valoracion"
                      type="number"
                      min="0"
                      max="10"
                      step="0.1"
                      value={jugadorSeleccionado.valoracion}
                      onChange={(e) =>
                        setJugadorSeleccionado({
                          ...jugadorSeleccionado,
                          valoracion: Number.parseFloat(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setJugadorSeleccionado(null)}>
                  Cancelar
                </Button>
                <Button
                  onClick={() => {
                    actualizarEstadisticas(jugadorSeleccionado.id, "partidos", jugadorSeleccionado.partidos)
                    actualizarEstadisticas(jugadorSeleccionado.id, "goles", jugadorSeleccionado.goles)
                    actualizarEstadisticas(jugadorSeleccionado.id, "asistencias", jugadorSeleccionado.asistencias)
                    actualizarEstadisticas(jugadorSeleccionado.id, "valoracion", jugadorSeleccionado.valoracion)
                    setJugadorSeleccionado(null)
                  }}
                >
                  Guardar Cambios
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  )
}
