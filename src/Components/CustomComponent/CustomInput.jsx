import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

export default function CustomInput({ label, type, register, name, validation, errors }) {
    return (
        <FloatingLabel controlId={`floating-${name}`} label={label} className="mb-3">
            <Form.Control type={type} placeholder="" {...register(name, validation)} className="border-primary" />
            {errors[name] && (
                <div className="text-danger text-end mt-1 mb-2" style={{ fontSize: '1rem' }}>
                    {errors[name].message}
                </div>
            )}
        </FloatingLabel>
    );
}
