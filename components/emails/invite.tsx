interface InviteTemplateProps {
  email?: string
  roomId: string
  roomName: string
  roomUrl: string
  invitedBy: string
}

export const InviteTemplate: React.FC<Readonly<InviteTemplateProps>> = (
  props
) => (
  <div>
    <h1>Hello, {props.email}!</h1>

    <p>You have been invited to participate in the room ${props.roomName}</p>
    <p>Click the link below to join the room:</p>
    <a href={props.roomUrl}>{props.roomUrl}</a>

    <p>Or use the following room ID:</p>
    <p>{props.roomId}</p>
  </div>
)

export default InviteTemplate
