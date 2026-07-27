import { createFileRoute } from '@tanstack/react-router'
import TeamDetails from '#/features/teams/TeamDetails'


export const Route = createFileRoute('/teams/$team')({
  component: RouteComponent,
})

function RouteComponent() {
  return     <TeamDetails />

}
