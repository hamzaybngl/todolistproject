package entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;


@Entity
@Table(name="todo")
public class Todo {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="todoId")
	private int todoId;
	
	@Column(name="todoName")
	private String todoName;
	
	@Column(name="todoExp")
	private String todoExp;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="todoCreatedAt",insertable=false)
	private Date todoCreatedAt;
	
	@Column(name="todoDeadline")
	private Date todoDeadline;
	
	@Column(name="todoStatus")
	private int todoStatus;
	
	@Column(name="todoUserFK")
	private int todoUserFK;
	
	public Todo() {
		
	}
	public Todo(String todoName, String todoExp, Date todoCreatedAt, Date todoDeadline, int todoStatus, int todoUserFK) {
		this.todoName = todoName;
		this.todoExp = todoExp;
		this.todoCreatedAt = todoCreatedAt;
		this.todoDeadline = todoDeadline;
		this.todoStatus = todoStatus;
		this.todoUserFK = todoUserFK;
	}

	
	

	public int getTodoId() {
		return todoId;
	}

	public void setTodoId(int todoId) {
		this.todoId = todoId;
	}

	public String getTodoName() {
		return todoName;
	}

	public void setTodoName(String todoName) {
		this.todoName = todoName;
	}


	public String getTodoExp() {
		return todoExp;
	}
	
	public void setTodoExp(String todoExp) {
		this.todoExp = todoExp;
	}
	public Date getTodoCreatedAt() {
		return todoCreatedAt;
	}

	public void setTodoCreatedAt(Date todoCreatedAt) {
		this.todoCreatedAt = todoCreatedAt;
	}

	public Date getTodoDeadline() {
		return todoDeadline;
	}

	public void setTodoDeadline(Date todoDeadline) {
		this.todoDeadline = todoDeadline;
	}

	public int getTodoStatus() {
		return todoStatus;
	}

	public void setTodoStatus(int todoStatus) {
		this.todoStatus = todoStatus;
	}

	public int getTodoUserFK() {
		return todoUserFK;
	}

	public void setTodoUserFK(int todoUserFK) {
		this.todoUserFK = todoUserFK;
	}
	
	@Override
	public String toString() {
		return "Todo [todoId=" + todoId + ", todoName=" + todoName + ", todoCreatedAt=" + todoCreatedAt
				+ ", todoDeadline=" + todoDeadline + ", todoStatus=" + todoStatus + ", todoUserFK=" + todoUserFK + "]";
	}

}
