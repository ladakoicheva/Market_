import style from './Modal.module.css'
import { ModeType } from '../../features/user/types'
import SignUpForm from '../SignUpForm/SignUpForm'
import SignInForm from '../SignInForm/SignInForm'
import { useAppDispatch ,useAppSelector} from '../../redux/hooks'
import { changeModeSignUp,changeModeSignIn } from '../../features/user/userSlice'

type props = {
  close: () => void 
}
export default function Modal({ close }: props) {
  const { mode } = useAppSelector((s) => s.user);
  const dispatch = useAppDispatch()

  return (
    <div className={style.blur}>
  
      <div className={style.modal}>
            <span className={style.close} onClick={close}>×</span>
          {mode === ModeType.SIGN_UP ?
          <SignUpForm  closeModal = {close} />
          : <SignInForm  closeModal = {close}/>}
        <div className={style.authText}>
          {mode === ModeType.SIGN_UP ?
            <p>Already have an account? <span onClick={()=>dispatch(changeModeSignIn())}>Sign In</span></p>
          : <p>Do not have an account? <span onClick={()=>dispatch(changeModeSignUp())}>Sign Up</span></p>}
        </div>
        
      </div>
      
      
    </div>
  )
}
