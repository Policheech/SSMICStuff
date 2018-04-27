using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NtierMvc.Model
{
    public class EmployeesEntity : IDisposable
    {
        #region Class Public Methods

        /// <summary>
        /// Purpose: Implements the IDispose interface.
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }

        #endregion

        #region Class Property Declarations

        [Required(ErrorMessage = "You must enter an employee ID.")]
        public int Id { get; set; }

        [Required(ErrorMessage = "You must enter an employee Name.")]
        [StringLength(50, MinimumLength = 3)]
        public string Name { get; set; }

        [Required(ErrorMessage = "You must enter an employee Age.")]
        [Range(15, 80, ErrorMessage = "Age range between 15 and 80 years.")]
        public int Age { get; set; }

        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public DateTime? HiringDate { get; set; }

        [Required(ErrorMessage = "You must enter an employee Gross Salary.")]
        public Decimal GrossSalary { get; set; }
        public Decimal NetSalary { get; set; }
        public DateTime ModifiedDate { get; set; }

        #endregion
    }
}
