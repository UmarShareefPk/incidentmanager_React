export class Incident {
    
    constructor(Id ,CreatedBy ,AssignedTo ,CreatedAT ,Title ,Description ,AdditionalData ,Attachment1 ,Attachment2 ,Attachment3 ,StartTime ) {
         
        this.Id = Id;
        this.CreatedBy =  CreatedBy;
        this.AssignedTo = AssignedTo;
        this.CreatedAT = CreatedAT;
        this.Title = Title;
        this.Description = Description;
        this.AdditionalData = AdditionalData;
        this.Attachment1 = Attachment1;
        this.Attachment2 = Attachment2;
        this.Attachment3 = Attachment3;
        this.StartTime = StartTime;
    }
  }