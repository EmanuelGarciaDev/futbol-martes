"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Trophy } from "lucide-react"

type Resultado = {
  id: string
  fecha: string
  equipoLocal: string
  equipoVisitante: string
  golesLocal: number
  golesVisitante: number
}

export default function ResultadosRecientes() {
  const [resultados, setResultados] = useState<Resultado[]>([])
  const [nuevoResultado, setNuevoResultado] = useState({
    equipoLocal: "Equipo A",
    equipoVisitante: "Equipo B",
    golesLocal: 0,
    golesVisitante: 0,
    fecha: new Date().toISOString().split("T")[0],
  })

  useEffect(() => {
    const resultadosGuardados = localStorage.getItem("resultados")
    if (resultadosGuardados) {
      setResultados(JSON.parse(resultadosGuardados))
    }
  }, [])

  const guardarResultado = () => {
    const nuevoId = Date.now().toString()
    const resultado = {
      id: nuevoId,
      ...nuevoResultado,
    }

    const nuevosResultados = [resultado, ...resultados].slice(0, 5) // Mantener solo los 5 más recientes
    setResultados(nuevosResultados)
    localStorage.setItem("resultados", JSON.stringify(nuevosResultados))

    // Resetear el formulario
    setNuevoResultado({
      ...nuevoResultado,
      golesLocal: 0,
      golesVisitante: 0,
      fecha: new Date().toISOString().split("T")[0],
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Resultados Recientes</CardTitle>
        <CardDescription>Registra y visualiza los últimos resultados</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Registrar Nuevo Resultado</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="equipoLocal">Equipo Local</Label>
                <Input
                  id="equipoLocal"
                  value={nuevoResultado.equipoLocal}
                  onChange={(e) => setNuevoResultado({ ...nuevoResultado, equipoLocal: e.target.value })}
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="equipoVisitante">Equipo Visitante</Label>
                <Input
                  id="equipoVisitante"
                  value={nuevoResultado.equipoVisitante}
                  onChange={(e) => setNuevoResultado({ ...nuevoResultado, equipoVisitante: e.target.value })}
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="golesLocal">Goles Local</Label>
                <Input
                  id="golesLocal"
                  type="number"
                  min="0"
                  value={nuevoResultado.golesLocal}
                  onChange={(e) =>
                    setNuevoResultado({ ...nuevoResultado, golesLocal: Number.parseInt(e.target.value) || 0 })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="golesVisitante">Goles Visitante</Label>
                <Input
                  id="golesVisitante"
                  type="number"
                  min="0"
                  value={nuevoResultado.golesVisitante}
                  onChange={(e) =>
                    setNuevoResultado({ ...nuevoResultado, golesVisitante: Number.parseInt(e.target.value) || 0 })
                  }
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="fecha">Fecha del Partido</Label>
                <Input
                  id="fecha"
                  type="date"
                  value={nuevoResultado.fecha}
                  onChange={(e) => setNuevoResultado({ ...nuevoResultado, fecha: e.target.value })}
                />
              </div>
            </div>
            <Button onClick={guardarResultado} className="w-full">
              Guardar Resultado
            </Button>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Últimos Resultados</h3>
            {resultados.length > 0 ? (
              <div className="space-y-4">
                {resultados.map((resultado) => (
                  <div key={resultado.id} className="rounded-lg border p-4">
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-muted-foreground">
                        {new Date(resultado.fecha).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                      {resultado.golesLocal > resultado.golesVisitante ? (
                        <div className="flex items-center text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-2 py-1 rounded">
                          <Trophy className="h-3 w-3 mr-1" />
                          Victoria Local
                        </div>
                      ) : resultado.golesLocal < resultado.golesVisitante ? (
                        <div className="flex items-center text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-2 py-1 rounded">
                          <Trophy className="h-3 w-3 mr-1" />
                          Victoria Visitante
                        </div>
                      ) : (
                        <div className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100 px-2 py-1 rounded">
                          Empate
                        </div>
                      )}
                    </div>
                    <div className="mt-2 flex justify-center items-center gap-4">
                      <div className="text-right flex-1">
                        <div className="font-semibold">{resultado.equipoLocal}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-2xl font-bold">{resultado.golesLocal}</div>
                        <div className="text-xl">-</div>
                        <div className="text-2xl font-bold">{resultado.golesVisitante}</div>
                      </div>
                      <div className="text-left flex-1">
                        <div className="font-semibold">{resultado.equipoVisitante}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">No hay resultados registrados aún.</div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
