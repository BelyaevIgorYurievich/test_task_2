import React from 'react';
import { withFormik, Form, Field } from 'formik';
import Yup from 'yup';
import InputMask from 'react-input-mask';
import { Button, Modal, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import MaskedFormControl from 'react-bootstrap-maskedinput'

class PersonalCard extends React.PureComponent {

	handleChengeValue = (type) => (event) => {

		const { setFieldValue } = this.props;
		setFieldValue(type, event.target.value);
	}

  render() {
  	const { 
  		touched,
  		errors,
  		values,
  		isSubmitting,
  		handleBlur,
			handleChange,
			handleSubmit,
			cancelСreationUser
  	} = this.props

    return (
			<div className='static-modal'>
				<Modal.Dialog>
					<Modal.Header>
      			<Modal.Title>Карточка создания физического лица</Modal.Title>
    			</Modal.Header>
					<Modal.Body>
					<Form>
							<FormGroup validationState={touched.surname && errors.surname ? 'error' : null}>
								<ControlLabel>Фамилия</ControlLabel>
								<FormControl
									type='text' 
									placeholder='Введите фамилию'
									onChange={this.handleChengeValue('surname')}
									value={values.surname}
								/>
								{touched.surname && errors.surname &&<HelpBlock>{errors.surname}</HelpBlock>}
							</FormGroup>

							<FormGroup validationState={touched.name && errors.name ? 'error' : null}>
								<ControlLabel>Имя</ControlLabel>
								<FormControl
									type='text' 
									placeholder='Введите имя'
									onChange={this.handleChengeValue('name')}
									value={values.name}
								/>
								{touched.name && errors.name &&<HelpBlock>{errors.name}</HelpBlock>}
							</FormGroup>

							<FormGroup validationState={touched.patronymic && errors.patronymic ? 'error' : null}>
								<ControlLabel>Отчество</ControlLabel>
								<FormControl
									type='text' 
									placeholder='Введите отчество'
									onChange={this.handleChengeValue('patronymic')}
									value={values.patronymic}
								/>
								{touched.patronymic && errors.patronymic &&<HelpBlock>{errors.patronymic}</HelpBlock>}
						</FormGroup>

						<FormGroup validationState={touched.date && errors.date ? 'error' : null}>
								<ControlLabel>Дата рождения</ControlLabel>
								<MaskedFormControl
									type='text' 
									placeholder='Введите дату рождения'
									onChange={this.handleChengeValue('date')}
									value={values.date}
									mask='11-11-1111'/>

								{touched.date && errors.date &&<HelpBlock>{errors.date}</HelpBlock>}
						</FormGroup>

					</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button 
							bsStyle='primary'  
							disabled={isSubmitting}
							onClick={handleSubmit}
						>Сохраить пользователя</Button>
						<Button
							disabled={isSubmitting}
							onClick={cancelСreationUser}
						>Отмена</Button>
					</Modal.Footer>
				</Modal.Dialog>
			</div>
    )
  }
}   

const FormikPersonalCard = withFormik({
  mapPropsToValues({ surname, name, patronymic, date }) {
    return {
      surname: surname || '',
      name: name || '',
      patronymic: patronymic || '',
      date: date || '',
      id: Math.random() * (1 - 999999999999) + 1
    }
	},
	
  validationSchema: Yup.object().shape({
    surname: Yup.string().min(2, 'Фамилия должна состоять минимум из 2-х символов').matches(/[A-ZА-ЯЁ]+/, 'С заглавной буквы').required('Обязательное поле'),
    name: Yup.string().min(2, 'Имя должно состоять минимум из 2-х символов').matches(/[A-ZА-ЯЁ]+/, 'С заглавной буквы').required('Обязательное поле '),
    patronymic: Yup.string().min(2, 'Отчество должно состоять минимум из 2-х символов').matches(/[A-ZА-ЯЁ]+/, 'С заглавной буквы').required('Обязательное поле '),
    date: Yup.string().matches(/(0[1-9]|1[0-9]|2[0-9]|3[01])-(0[1-9]|1[012])-[0-9]{4}/, 'Дата заполнена некорректно')
	}),
	
  handleSubmit(values, { setSubmitting, resetForm, props }) {
    setSubmitting(false);
		
		resetForm();

		props.successСreationUser(values);
  }
})(PersonalCard)

export default FormikPersonalCard