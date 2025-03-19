"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, MapPin } from "lucide-react"

export default function ProximoPartido() {
  const [proximoPartido, setProximoPartido] = useState({
    fecha: "2025-03-26",
    hora: "18:00",
    lugar: "Estadio Municipal",
    equipoLocal: "Equipo A",
    equipoVisitante: "Equipo B",
  })

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Próximo Partido</CardTitle>
        <CardDescription>Detalles del próximo encuentro</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col items-center">
              <Image
                src="/placeholder.svg?height=80&width=80"
                alt={proximoPartido.equipoLocal}
                width={80}
                height={80}
                className="rounded-full bg-muted p-2"
              />
              <h3 className="mt-2 font-semibold">{proximoPartido.equipoLocal}</h3>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">VS</div>
              <div className="mt-2 flex flex-col gap-1 text-sm text-muted-foreground">
                <div className="flex items-center justify-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(proximoPartido.fecha).toLocaleDateString("es-ES", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{proximoPartido.hora}</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{proximoPartido.lugar}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/placeholder.svg?height=80&width=80"
                alt={proximoPartido.equipoVisitante}
                width={80}
                height={80}
                className="rounded-full bg-muted p-2"
              />
              <h3 className="mt-2 font-semibold">{proximoPartido.equipoVisitante}</h3>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Editar Detalles</Button>
        <Button>Recordatorio</Button>
      </CardFooter>
    </Card>
  )
}
