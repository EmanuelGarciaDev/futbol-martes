"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

type Resultado = {
  id: string
  fecha: string
  equipoLocal: string
  equipoVisitante: string
  golesLocal: number
  golesVisitante: number
}

export default function HistorialPartidos() {
  const [historial, setHistorial] = useState<Resultado[]>([])
  const [estadisticas, setEstadisticas] = useState({
    totalPartidos: 0,
    victoriasEquipoA: 0,
    victoriasEquipoB: 0,
    empates: 0,
    golesEquipoA: 0,
    golesEquipoB: 0,
  })

  useEffect(() => {
    // Cargar todos los resultados (no solo los 5 más recientes)
    const resultadosGuardados = localStorage.getItem("resultados")
    if (resultadosGuardados) {
      const datos = JSON.parse(resultadosGuardados)
      setHistorial(datos)

      // Calcular estadísticas
      const stats = datos.reduce(
        (acc: any, partido: Resultado) => {
          acc.totalPartidos += 1
          acc.golesEquipoA += partido.equipoLocal === "Equipo A" ? partido.golesLocal : partido.golesVisitante
          acc.golesEquipoB += partido.equipoLocal === "Equipo B" ? partido.golesLocal : partido.golesVisitante

          if (partido.golesLocal > partido.golesVisitante) {
            if (partido.equipoLocal === "Equipo A") acc.victoriasEquipoA += 1
            else acc.victoriasEquipoB += 1
          } else if (partido.golesLocal < partido.golesVisitante) {
            if (partido.equipoVisitante === "Equipo A") acc.victoriasEquipoA += 1
            else acc.victoriasEquipoB += 1
          } else {
            acc.empates += 1
          }

          return acc
        },
        {
          totalPartidos: 0,
          victoriasEquipoA: 0,
          victoriasEquipoB: 0,
          empates: 0,
          golesEquipoA: 0,
          golesEquipoB: 0,
        },
      )

      setEstadisticas(stats)
    }
  }, [])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Historial de Partidos</CardTitle>
        <CardDescription>Registro histórico de todos los encuentros</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-sm font-medium">Partidos Jugados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{estadisticas.totalPartidos}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-sm font-medium">Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Equipo A</div>
                    <div className="text-xl font-bold">{estadisticas.victoriasEquipoA}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Empates</div>
                    <div className="text-xl font-bold">{estadisticas.empates}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Equipo B</div>
                    <div className="text-xl font-bold">{estadisticas.victoriasEquipoB}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-sm font-medium">Goles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Equipo A</div>
                    <div className="text-xl font-bold">{estadisticas.golesEquipoA}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Equipo B</div>
                    <div className="text-xl font-bold">{estadisticas.golesEquipoB}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">Fecha</TableHead>
                  <TableHead>Local</TableHead>
                  <TableHead className="text-center">Resultado</TableHead>
                  <TableHead>Visitante</TableHead>
                  <TableHead className="text-right">Ganador</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {historial.length > 0 ? (
                  historial.map((partido) => (
                    <TableRow key={partido.id}>
                      <TableCell className="font-medium">
                        {new Date(partido.fecha).toLocaleDateString("es-ES", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                        })}
                      </TableCell>
                      <TableCell>{partido.equipoLocal}</TableCell>
                      <TableCell className="text-center font-bold">
                        {partido.golesLocal} - {partido.golesVisitante}
                      </TableCell>
                      <TableCell>{partido.equipoVisitante}</TableCell>
                      <TableCell className="text-right">
                        {partido.golesLocal > partido.golesVisitante ? (
                          <Badge
                            variant="outline"
                            className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                          >
                            {partido.equipoLocal}
                          </Badge>
                        ) : partido.golesLocal < partido.golesVisitante ? (
                          <Badge
                            variant="outline"
                            className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                          >
                            {partido.equipoVisitante}
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                          >
                            Empate
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No hay partidos registrados aún.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
