import React from 'react';
import { withFormik, Form, Field } from 'formik'
import Yup from 'yup'
import { Button, Modal, FormGroup, ControlLabel, FormControl, HelpBlock, Radio } from 'react-bootstrap';
import MaskedFormControl from 'react-bootstrap-maskedinput';

import PersonalCard from 'PersonalCard'
import RadioButton from 'RadioButton'

import { allData } from './data'
import './style.less'

class DealCard extends React.PureComponent {
  
  componentDidMount() {
		this.props.setFieldValue('userNames', allData);
  }

  handleOpenPersonal = () => {
  	const { setFieldValue } = this.props;
  	
  	setFieldValue('isPersonalCardOpen', true);
  }

  successСreationUser = (data) => {
  	const {setFieldValue, values:{userNames}} = this.props;
  	
  	setFieldValue('isPersonalCardOpen', false);
  	setFieldValue('userNames', [...userNames, data]);
  	setFieldValue('nameId', data.id);
	} 
	
	cancelСreationUser = () => {
		const {	setFieldValue } = this.props;
		
  	setFieldValue('isPersonalCardOpen', false);
  } 

	handleChengeValue = (type, value) => () => {
		const { setFieldValue } = this.props;

		if (type === 'typeName') {
			setFieldValue('role', ''); 	
		}
 
		setFieldValue(type, value);
	}

	handleChengeValueWithEvent = (type) => (event) => {
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
			setFieldValue,
			handleSubmit
  	} = this.props

		const isUserBuyer = values.role === 'Покупатель' || values.role === 'Заказчик';
		const isUserSeller =  values.role === 'Продавец' || values.role === 'Исполнитель';
		const isSelectTypeIsProduct = values.typeName === 'Товар';

  	if (values.isPersonalCardOpen) {
			return <PersonalCard
								 successСreationUser={this.successСreationUser}
								 cancelСreationUser={this.cancelСreationUser}
			 				/>
  	}

    return (
				<div className='static-modal personal-card '>
					<Modal.Dialog>
						<Modal.Header>
							<Modal.Title>Создание сделки</Modal.Title>
						</Modal.Header>

						<Modal.Body>
							<FormGroup>
								<ControlLabel>Тип объекта сделки</ControlLabel>
								<RadioButton 
									isActive={isSelectTypeIsProduct} 
									handleСhange={this.handleChengeValue('typeName', 'Товар')}
									fieldName='Товар'
								/>
								<RadioButton 
									isActive={!isSelectTypeIsProduct} 
									handleСhange={this.handleChengeValue('typeName', 'Услуга')}
									fieldName='Услуга'	
								/>
							</FormGroup>
							<FormGroup>
								<ControlLabel>Роль в сделке</ControlLabel>
								<RadioButton 
									isActive={isUserBuyer} 
									handleСhange={this.handleChengeValue('role', isSelectTypeIsProduct ? 'Покупатель' : 'Заказчик')}
									fieldName={isSelectTypeIsProduct ? 'Покупатель' : 'Заказчик'}
								/>
								<RadioButton 
									isActive={isUserSeller} 
									handleСhange={this.handleChengeValue('role', isSelectTypeIsProduct ? 'Продавец' : 'Исполнитель')}
									fieldName={isSelectTypeIsProduct ? 'Продавец' : 'Исполнитель'}	
								/>
							</FormGroup>
							<FormGroup>
      							<ControlLabel>Вы будете участвовать в сделке как</ControlLabel>
								<FormControl onChange={this.handleChengeValueWithEvent('nameId')} 
									value={values.nameId} 
									componentClass="select" 
									placeholder="select">
									<option value=''/>
									{
										values.userNames.map(({id, name, surname, patronymic}, index) => {
											return <option key={id} value={id}>
												{`${surname} ${name} ${patronymic}`}
											</option>
										})
									}
								</FormControl>
							</FormGroup>
							<Button 
								className='add-user-btn'
								bsStyle='success'
								disabled={isSubmitting}
								onClick={this.handleOpenPersonal}
							>Добавить пользователя</Button>
							<FormGroup validationState={touched.productName && errors.productName ? 'error' : null}>
								<ControlLabel>Название товара</ControlLabel>
								<FormControl
									type='text' 
									placeholder='Введите название товара'
									onChange={this.handleChengeValueWithEvent('productName')}
									value={values.productName}
								/>
								{touched.productName && errors.productName &&<HelpBlock>{errors.productName}</HelpBlock>}
							</FormGroup>
							<FormGroup validationState={touched.description && errors.description ? 'error' : null}>
								<ControlLabel>Описание товара</ControlLabel>
								<FormControl
									type='text' 
									componentClass="textarea"
									placeholder='Введите oписание товара'
									onChange={this.handleChengeValueWithEvent('description')}
									value={values.description}
								/>
								{touched.description && errors.description &&<HelpBlock>{errors.description}</HelpBlock>}
							</FormGroup>

							</Modal.Body>
							<Modal.Footer>
								<Button 
									disabled={isSubmitting}
									bsStyle='primary'  
									onClick={handleSubmit}
								>Сохраить</Button>
							</Modal.Footer>	

					</Modal.Dialog>
				</div>
    		)
  	}
}   

const FormikDealCard = withFormik({ 
  mapPropsToValues({ description, productName, typeName, role, nameId, userNames, isPersonalCardOpen }) {
    return {
      description: description || '',
      productName: productName || '',
      typeName: typeName || 'Товар',
      role: role || '',
      userNames: [],
      nameId: nameId || '',
      isPersonalCardOpen: isPersonalCardOpen || false
    }
  },
  validationSchema: Yup.object().shape({
    description: Yup.string(),
    productName: Yup.string().min(2, 'Название должно состоять минимум из 2-x символов')
  }),
  handleSubmit(values, { setSubmitting, resetForm }) {
    setSubmitting(false);
		console.log( values,' values ' ); 
  }
})(DealCard)

export default FormikDealCard