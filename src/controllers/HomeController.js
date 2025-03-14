import { validateInputs } from '../utils/validation.js'
import MasterModel from '../models/MasterModel.js';


const masterModel = new MasterModel();

class HomeController {
    static async homePage(req, res, next) {
            try {
                const customers = await masterModel.selectAll('customers');
                res.render('home/home',{
                    titlePage: 'Inicio',
                    customers
                });

            } catch (error) {
                next(error);
            }
    }

    static create(req, res, next) {
        res.render('home/create', {
            titlePage: 'Crear Cliente'
        });
    }

    static async handleCreate(req, res){ 
        const {name, lastname, email, address, phone } = req.body;
        const {errors, s} = validateInputs(name, lastname, email, address, phone);
        
        
        if (errors.length > 0) {
            return res.render('home/create', {
                titlePage: 'Crear Cliente',
                errors,
                customer: {name, lastname, email, address, phone}
            });
        }

        try {
            const customerExists = await masterModel.selectByField('customers', 'email', email, 'email');
            console.log(customerExists);
            if (customerExists.length > 0 && customerExists[0].email === email){
                errors.push({msg: 'El cliente ya se registro', type:'danger'});
            }

            if (errors.length > 0) {
                return res.render('home/create', {
                    titlePage: 'Crear Cliente',
                    errors,
                    customer: {name, lastname, email, address, phone}
                });
            }

            const result = await masterModel.insert('customers', {
                name: s.name,
                lastname: s.lastname,
                email: s.email,
                address: s.address,
                phone: s.phone
            });
    
            if(result.affectedRows > 0){
                res.flash('success', 'El cliente fue creado correctamente');
                return res.redirect('/');
            } else {
                res.flash('error', 'Hubo un error al crear el cliente');
                return res.redirect('/');
            }
        } catch (error) {
            next(error);
        }
        
    }

    static async update(req, res, next) {
        const idCustomer = req.params.id;
        if (!idCustomer || isNaN(idCustomer)){
            const err = new Error('Customer ID not found');
            err.status = 404;
            return next(err);
        }

        try {
            const customerExists = await masterModel.selectByField('customers', 'id', idCustomer);
            if(customerExists.length === 0){
                const err = new Error('Customer ID not found');
                err.status = 404;
                return next(err);
            }
            
            return res.render('home/update', {
                titlePage: 'Editar Cliente',
                customer: {
                    name: customerExists[0].name,
                    lastname: customerExists[0].lastname,
                    email: customerExists[0].email,
                    address: customerExists[0].address,
                    phone: customerExists[0].phone,
                }
            });
        } catch (error) {
            next(error);
        }
    }

    static async handleUpdate(req, res, next) {
        const {name, lastname, email, address, phone } = req.body;
        const idCustomer = req.params.id;

        if(!idCustomer || isNaN(idCustomer)) {
            const err = new Error('Customer ID not found');
            err.status = 404;
            return next(err);
        }

        try {
            const customerExists = await masterModel.selectByField('customers', 'id', idCustomer);
            if(customerExists.length === 0) {
                const err = new Error('Customer ID not found');
                err.status = 404;
                return next(err);
            }

            const { errors, s } = validateInputs(name, lastname, email, address, phone );

            const emailExists = await masterModel.selectByFieldExcludingId('customers', 'email', email, idCustomer, 'email');

            if (emailExists && emailExists.length !== 0){
                errors.push({ msg: 'El email ya esta registrado', type: 'danger'});
            }
            if (errors.length > 0) {
                return res.render('home/update', {
                    titlePage: 'Editar Cliente',
                    errors,
                    customer: {
                        name: customerExists[0].name,
                        lastname: customerExists[0].lastname,
                        email: customerExists[0].email,
                        address: customerExists[0].address,
                        phone: customerExists[0].phone,
                    }
                });
            }

            const result = await masterModel.updateByField('customers', {
                name: s.name,
                lastname: s.lastname,
                email: s.email,
                address: s.address,
                phone: s.phone,

            }, 'id', idCustomer);
            
            if(result.affectedRows > 0){
                res.flash('success', 'El cliente fue actualizado correctamente');
                return res.redirect('/');
            } else {
                res.flash('error', 'Hubo un error al actualizar el cliente');
                return res.redirect('/');
            }
        } catch (error) {
            next(error);
        }
    }

    static async delete(req, res, next) {
        const idCustomer = req.params.id;

        if(!idCustomer || isNaN(idCustomer)) {
            const err = new Error('Customer ID not found');
            err.status = 404;
            return next(err);
        }
        try {
            const customerExists = await masterModel.selectByField('customers', 'id', idCustomer);
            if(customerExists.length === 0) {
                const err = new Error('Customer ID not found');
                err.status = 404;
                return next(err);
            }
            if (customerExists[0].id !== parseInt(idCustomer)) {
                const err = new Error('Not authorized!!!');
                err.status = 403;
                return next(err);
            }

            const deleteCustomer = await masterModel.deleteByField('customers', 'id', idCustomer);

            if( deleteCustomer.affectedRows > 0) {
                res.flash('success', 'El cliente fue eliminado correctamente');
                return res.redirect('/');
            } else {
                res.flash('error', 'Hubo un error al eliminar el cliente');
                return res.redirect('/');
            }
        } catch (error) {
            next(error);
        }
    }

}// End Class


export default HomeController;