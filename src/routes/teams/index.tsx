import { createFileRoute } from '@tanstack/react-router'
import TeamsList from '#/features/teams/TeamsList'
export const Route = createFileRoute('/teams/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
    <TeamsList />
</>
    )
}
