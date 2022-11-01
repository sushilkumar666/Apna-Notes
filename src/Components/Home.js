import Notes from './Notes';

const Home = (props) => {
    const { showAlert } = props;
    return (
        <div className='container'>
            <Notes showAlert={showAlert} mode={props.mode} />
        </div>
    )
}
export default Home;