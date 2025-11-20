'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'

interface TaskCard {
  id: number
  list: number
  position: number
}

export function FlowboardVisualization() {
  const [cards, setCards] = useState<TaskCard[]>([
    { id: 1, list: 0, position: 0 },
    { id: 2, list: 0, position: 1 },
    { id: 3, list: 1, position: 0 },
    { id: 4, list: 1, position: 1 },
    { id: 5, list: 2, position: 0 },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setCards((prevCards) => {
        const newCards = [...prevCards]
        const randomIndex = Math.floor(Math.random() * newCards.length)
        const card = newCards[randomIndex]
        const newList = (card.list + 1) % 3
        newCards[randomIndex] = { ...card, list: newList }
        return newCards
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const lists = ['A Fazer', 'Em Progresso', 'Concluído']

  return (
    <div className="relative w-full h-[600px] animate-float">
      <div className="grid grid-cols-3 gap-4 h-full">
        {lists.map((listName, listIndex) => (
          <div key={listIndex} className="space-y-3">
            <div className="bg-muted rounded-lg p-3">
              <h3 className="font-sans font-semibold text-sm text-muted-foreground">
                {listName}
              </h3>
            </div>
            <div className="space-y-3">
              {cards
                .filter((card) => card.list === listIndex)
                .map((card) => (
                  <Card
                    key={card.id}
                    className="p-4 bg-background border-border transition-all duration-500 hover:shadow-lg"
                  >
                    <div className="space-y-2">
                      <div className="h-3 bg-muted rounded w-3/4" />
                      <div className="h-3 bg-muted rounded w-1/2" />
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
