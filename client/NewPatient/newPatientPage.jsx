
class NewPatientPage extends React.Component {
  constructor( props ){
    super(props);
    this.language = {};
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(){
    console.log("A new patient was submitted");
    console.log(this);
  }
    
  render() {
    return (
      <div>
        <Form onSubmit={ this.onSubmit } >
          <Form.Input type='number' icon='icon icon-form-tel' name='phone' ref={ (i)=> this.phoneInput = i} />
          <Form.Radio title='Kannada' name='language' checked={true} ref={ (i)=> this.language.kannadaBtn = i } />
          <Form.Radio title='Hindi' name='language' checked={false} ref={ (i)=> this.language.hindiBtn = i }/>
          <Form.Radio title='English' name='language' checked={false} ref={ (i)=> this.language.englishBtn = i }/>
          <Form.Checkbox title='Subscribe to Phone Messages' ref={ (i)=> this.subscribeCheckbox = i }/>
        </Form>
      </div>
    )
  }
}

this.NewPatientPage = NewPatientPage
