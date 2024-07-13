import { Button as FlowBiteButton } from 'flowbite-react'
import DefaultModal from 'components/Modals/DefaultModal'
import ModalProps from 'types/ModalProps'
import baseScanAddress from 'helpers/baseScanAddress'
import env from 'helpers/env'

function BodyContent() {
  const subHeaderStyle = 'font-script text-primary-bright text-3xl'
  const textStyles = '!text-primary'

  return (
    <div className="max-h-96">
      <h2 className={subHeaderStyle}>First Step</h2>
      <p className={textStyles}>
        To use the site, you need to connect your crypto wallet. If you want the
        site to display your nickname and photo from Warpcast, you need to
        connect a crypto wallet that is linked to Warpcast.
      </p>
      <h2 className={subHeaderStyle}>How to top up the balance?</h2>
      <p className={textStyles}>
        On the site, you can top up the game currency "Hats". This can be done
        by going to neged-hat.app/convert. To top up Hats, you need to have
        Neged on your crypto wallet, with which you connected to the site. Neged
        CA:{' '}
        <a
          href={baseScanAddress(env.VITE_TOKEN_ADDRESS)}
          target="_blank"
          className={textStyles + ' !underline break-all'}
        >
          {env.VITE_TOKEN_ADDRESS}
        </a>
        . Convert Neged to Hats to top up your game account, for this, enter the
        required amount of Neged. The Neged and Hats conversion ratio is one to
        one.
      </p>
      <h2 className={subHeaderStyle}>I topped up my balance, what's next?</h2>
      <p className={textStyles}>
        Next, you can proceed directly to the game itself. To do this, go to the
        page neged-hat.app.
      </p>
      <h2 className={subHeaderStyle}>Game Rules</h2>
      <p className={textStyles}>
        Neged Hat game provides players with the opportunity to contribute to
        the common deposit in order to win Hats, which are transferred to the
        winner at the end of the round. Adding Hats to the deposit increases its
        value. The maximum number of players in one round is 50. The round timer
        starts when two players are participating. The time of one round is one
        minute. At the end of the time, all Hats that were contributed to the
        common deposit participate in the draw. The more Hats you have
        contributed, the higher your chances of winning. In case of a win, the
        winner receives all Hats from the common pool. The site's commission is
        10% of the winnings in the absence of referrals from the winner.
      </p>
      <h2 className={subHeaderStyle}>Referral System</h2>
      <p className={textStyles}>
        A user can attract referrals using an invite link. In case the user has
        referrals, the site's commission is reduced to 7.5% of the win amount.
        Also, the user will receive 2.5% of the referral's winnings.
      </p>
    </div>
  )
}

function ModalFooter({ closeModal }: { closeModal: () => void }) {
  const firstButton = FlowBiteButton({
    onClick: closeModal,
    color: 'purple',
    children: 'Gotcha :)',
  })

  const negedFID = 398355
  const message = 'Hello, I played at neged-hat.app and encountered a problem'
  const secondButton = FlowBiteButton({
    onClick: () =>
      window.open(
        `https://warpcast.com/create/${negedFID}?text=${message}`,
        '_blank'
      ),
    color: 'red',
    children: 'DM @neged',
  })

  return (
    <div className="flex flex-row gap-x-2">
      {firstButton}
      {secondButton}
    </div>
  )
}

export default function ({ modalOpen, setModalOpen }: ModalProps) {
  return (
    <DefaultModal
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      header="Faq"
      bodyContent={<BodyContent />}
      footerContent={<ModalFooter closeModal={() => setModalOpen(false)} />}
    />
  )
}
