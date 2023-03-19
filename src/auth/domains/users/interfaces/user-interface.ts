import { EmailVO } from '../../../../shared/value-object/email-vo';
import { UniqueEntityIdVO } from '../../../../shared/value-object/unique-entity-id-vo';

export interface User {
  firstName: string;
  lastName: string;
  email: EmailVO;
  id: UniqueEntityIdVO;
}
