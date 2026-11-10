import Button from '../Button/Button';


type Props = {
  isVisible: boolean;
  onClick: () => void | Promise<void>;
};

export default function ShowMoreButton({ isVisible, onClick }: Props) {
  if (!isVisible) return null;

  return <Button text="Show more..." onClick={onClick} isAsync={true} style={{marginBottom:'20px',width:'94vw'}} />;
}
