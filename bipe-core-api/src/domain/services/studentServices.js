import StudentDTO from '../DTOs/StudentDTO';

const IsStudentDTO = obj => obj && typeof(obj) === 'object' && obj.constructor === StudentDTO;

export const GetDisplayName = (studentDTO) => {
    if(!IsStudentDTO)
        throw 'Incorrect parameter passing, please make invocation like this: GetDisplayName(StudentDTO student).';

    return studentDTO.nickname || studentDTO.socialName || studentDTO.name;
}