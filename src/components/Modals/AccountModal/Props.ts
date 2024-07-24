import AddressProp from 'types/AddressProp'
import ModalProps from 'types/ModalProps'

export interface AccountModalInner extends AddressProp {
  logout: () => Promise<void>
  setOpenShareFaq: () => void
}

export interface AccountModalProps extends AccountModalInner, ModalProps {}
