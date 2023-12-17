using System;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.SurveillanceTasks
{   
public class SurveillanceTaskId: IValueObject
    {
        public string SurveillanceTaskIdentifier { get; set; }

        public SurveillanceTaskId()
        {
            this.SurveillanceTaskIdentifier = "";
        }

        public SurveillanceTaskId(string text)
        {
            this.SurveillanceTaskIdentifier = ValidateWarehouseIdentifier(text);
        }

        private string ValidateWarehouseIdentifier(string surveillanceTaskIdentifier)
        {
            if (surveillanceTaskIdentifier == null)
            {
                throw new NullReferenceException("The surveillanceTaskId can't be null.");
            }
            else
            {
                if (surveillanceTaskIdentifier.Length > 5)
                {
                    throw new BusinessRuleValidationException("The surveillanceTaskId can't have more than 5 characters.");
                }
            }

            return surveillanceTaskIdentifier;
        }

        public override string ToString()
        {
            return SurveillanceTaskIdentifier;
        }
    }
}