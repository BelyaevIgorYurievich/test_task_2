import React from 'react';
import { withFormik, Form, Field } from 'formik'
import Yup from 'yup'
import InputMask from 'react-input-mask'

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

  render() {

  	const { 
  		touched,
  		errors,
  		values,
  		isSubmitting,
  		handleBlur,
  		handleChange,
  		setFieldValue
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
	    <div className='personal-card'>
	      <Form className='personal-card__body'>
					<label>
							<span className='label'>Товар</span>
								<RadioButton 
									isActive={isSelectTypeIsProduct} 
									handleСhange={this.handleChengeValue('typeName', 'Товар')}	
								/>
						</label>
					<label>
							<span className='label'>Услуга</span> 
								<RadioButton 
									isActive={!isSelectTypeIsProduct} 
									handleСhange={this.handleChengeValue('typeName', 'Услуга')}	
								/>
						</label>
					<label>
							<span className='label'>{isSelectTypeIsProduct ? 'Покупатель' : 'Заказчик'}</span>
								<RadioButton 
									isActive={isUserBuyer} 
									handleСhange={this.handleChengeValue('role', isSelectTypeIsProduct ? 'Покупатель' : 'Заказчик')}	
								/>
						</label>
					<label>
							<span className='label'>{isSelectTypeIsProduct ? 'Продавец' : 'Исполнитель'}</span>
								<RadioButton 
									isActive={isUserSeller} 
									handleСhange={this.handleChengeValue('role', isSelectTypeIsProduct ? 'Продавец' : 'Исполнитель')}	
								/>
					</label>
					<div className='input'>
						<label>
							<span className='label'>Название товара:</span>
							<Field name='productName' placeholder='Введите название товара'/>
						</label>
						{ touched.productName && errors.productName && <p className='error'>{errors.productName}</p> }
					</div>
					<label>
						<span className='label'>Вы будете участвовать в сделке как:</span>
						<Field component='select' name='nameId'>
								<option onClick={this.handleChengeValue('nameId', '')} value=''></option>
								{
									values.userNames.map(({id, name, surname, patronymic}, index) => {
										return <option key={id} 
											onClick={this.handleChengeValue('nameId', id)} 
											value={id}>{`${surname} ${name} ${patronymic}`}
										</option>
									})
								}
						</Field>
					</label>
					<button className='button' onClick={this.handleOpenPersonal}>Добавить пользователя</button>
					<div className='input'>
						<label>
							<span className='label'>Описание товара:</span>
							<Field name='description' placeholder='Введите описание товара'/>
						</label>
						{ touched.description && errors.description && <p className='error'>{errors.description}</p> }
					</div>
					<div className='personal-card__footer'>
						<button className='button' disabled={isSubmitting}>Сохраить</button>
					</div>
		  	</Form>
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
		resetForm();
		console.log( values,' values ' ); 
  }
})(DealCard)

export default FormikDealCard