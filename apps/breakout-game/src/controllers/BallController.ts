import { PHYSICS } from '@/constants/GameConstants';
import BreakoutScene from '@/scenes/breakout/BreakoutScene';
import * as Phaser from 'phaser';
import ParticleController from './ParticleController';

/**
 * Controls individual ball behavior and effects
 */
class BallController {
  private scene: BreakoutScene;
  private ball: Phaser.Physics.Matter.Sprite;
  isActive: boolean = true; // Public to match usage in BallManager
  private effects: Set<string> = new Set(); // fireball, fast, slow, etc.
  private stuckToPaddle: boolean = false;
  private stuckPaddle?: Phaser.Physics.Matter.Sprite;
  private stuckOffset: Phaser.Math.Vector2 = new Phaser.Math.Vector2(0, 0);
  private particleControllers: ParticleController[] = [];
  
  // Speed regulation properties from the second implementation
  private minSpeed: number = PHYSICS.BALL.MIN_VELOCITY;
  private maxSpeed: number = PHYSICS.BALL.MAX_VELOCITY;
    
  constructor(scene: BreakoutScene, ball: Phaser.Physics.Matter.Sprite) {
    this.scene = scene;
    this.ball = ball;
    this.setupEventListeners();
    this.initBall();
  }
    
  /**
   * Initialize ball properties
   */
  private initBall(): void {
    // Set unique ID for this ball
    this.ball.setData('id', Date.now().toString() + Math.random().toString());
    this.ball.setData('controller', this);

    // Set ball physics properties
    this.ball.setCircle(this.ball.width / 2);
    this.ball.setFriction(0);
    this.ball.setBounce(1);

    // Set collision properties if physics manager exists
    const physicsManager = this.scene.getPhysicsManager?.();
    if (physicsManager) {
      physicsManager.setCollisionCategory(this.ball, 'ball');
    }
  }

  /**
   * Set up event listeners
   */
  private setupEventListeners(): void {
    const eventManager = this.scene.getEventManager?.();
    if (!eventManager) return;

    // Listen for game state events
    eventManager.on('gamePaused', () => { this.isActive = false; }, this);
    eventManager.on('gameResumed', () => { this.isActive = true; }, this);

    // Listen for ball-specific events
    eventManager.on('ballEffectApplied', (data: { ballId: string, effect: string, duration?: number }) => {
      if (data.ballId === this.ball.getData('id')) {
        this.applyEffect(data.effect, data.duration);
      }
    }, this);
  }

  /**
   * Update method called every frame
   */
  update(): void {
    if (!this.isActive) return;
    
    // Apply effects (like fireball trail)
    this.updateEffects();
      
    // Check if ball is stuck to paddle
    if (this.stuckToPaddle) {
      this.updateStuckBall();
    } else {
      // Regulate ball speed (from second implementation)
      this.regulateSpeed();
      
      // Enforce velocity limits (from first implementation)
      this.enforceVelocityLimits();
    }
    
    // Check if ball is out of bounds
    if (this.isOutOfBounds()) {
      this.handleOutOfBounds();
    }
  }

  /**
   * Regulate ball speed to ensure it's within min/max bounds
   * (Implementation from the second version)
   */
  private regulateSpeed(): void {
    if (!this.ball || !this.ball.body) return;
    
    // Get current velocity
    const velocity = this.ball.body.velocity;
    if (!velocity) return;
    
    // Calculate current speed
    const speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
    
    // If speed is outside bounds, adjust it
    if (speed < this.minSpeed || speed > this.maxSpeed) {
      // Calculate normalized direction
      const angle = Math.atan2(velocity.y, velocity.x);
      
      // Apply appropriate speed
      const targetSpeed = speed < this.minSpeed ? this.minSpeed : this.maxSpeed;
      
      // Calculate new velocity components
      const newVelocityX = Math.cos(angle) * targetSpeed;
      const newVelocityY = Math.sin(angle) * targetSpeed;
      
      // Apply new velocity
      this.scene.matter.body.setVelocity(this.ball.body as any, {
        x: newVelocityX,
        y: newVelocityY
      });
    }
  }

  /**
   * Update ball effects
   */
  private updateEffects(): void {
    // Update effect-specific behaviors
    if (this.effects.has('fireball')) {
      this.updateFireballEffect();
    }

    if (this.effects.has('ghost')) {
      this.updateGhostEffect();
    }

    // Add other effect updates as needed
  }

  /**
   * Update fireball effect (particle trail)
   */
  private updateFireballEffect(): void {
    // Make sure we have a particle controller
    if (this.particleControllers.length === 0 || !this.particleControllers[0]) {
      this.createFireballEffect();
    }

    // Position is automatically updated by the trail controller
  }

  /**
   * Create fireball particle effect
   */
  private createFireballEffect(): void {
    // Get particle manager
    const particleManager = this.scene.getParticleManager?.();
    if (!particleManager) return;
    
    // Create trail effect
    const controller = particleManager.createTrail(
      this.ball,
      0xff6600, // Orange color
      0 // Permanent until removed
    );
    
    // Add to controllers array
    if (controller) {
      this.particleControllers.push(controller);
    }
  }

  /**
   * Update ghost effect (transparency)
   */
  private updateGhostEffect(): void {
    // Pulse transparency
    const time = this.scene.time.now;
    const alpha = 0.3 + (Math.sin(time / 200) * 0.3);
    this.ball.setAlpha(alpha);
  }

  /**
   * Update ball position when stuck to paddle
   */
  private updateStuckBall(): void {
    if (!this.stuckPaddle) return;

    // Update ball position based on paddle position and offset
    this.ball.x = this.stuckPaddle.x + this.stuckOffset.x;
    this.ball.y = this.stuckPaddle.y + this.stuckOffset.y;

    // Keep ball velocity at zero
    this.ball.setVelocity(0, 0);
  }

  /**
   * Enforce minimum and maximum velocity
   */
  private enforceVelocityLimits(): void {
    if (this.stuckToPaddle || !this.ball || !this.ball.body) return;
    
    try {
      // Create a safe velocity vector
      let vx = 0;
      let vy = 0;
      
      // Safely get velocity components
      if (this.ball.body.velocity) {
        vx = this.ball.body.velocity.x || 0;
        vy = this.ball.body.velocity.y || 0;
      }
      
      const velocity = new Phaser.Math.Vector2(vx, vy);
      const speed = velocity.length();

      // Enforce minimum velocity
      if (speed < this.minSpeed) {
        velocity.normalize().scale(this.minSpeed);
        this.ball.setVelocity(velocity.x, velocity.y);
      }

      // Enforce maximum velocity
      else if (speed > this.maxSpeed) {
        velocity.normalize().scale(this.maxSpeed);
        this.ball.setVelocity(velocity.x, velocity.y);
      }
    } catch (error) {
      // Silent fail to prevent console spam
      // The ball might be in an invalid state temporarily
    }
  }

  /**
   * Apply an effect to the ball
   */
  applyEffect(effect: string, duration?: number): void {
    this.effects.add(effect);
      
    // Visual changes based on effect
    if (effect === 'fireball') {
      this.ball.setTint(0xff6600);
      this.createFireballEffect();
    } else if (effect === 'fast') {
      this.ball.setTint(0xffff00);
      // Increase ball speed
      this.multiplyVelocity(1.5);
    } else if (effect === 'slow') {
      this.ball.setTint(0x0000ff);
      // Decrease ball speed
      this.multiplyVelocity(0.5);
    } else if (effect === 'ghost') {
      // Make ball semi-transparent
      this.ball.setAlpha(0.5);
      // Change collision category to pass through certain objects
      const physicsManager = this.scene.getPhysicsManager?.();
      if (physicsManager) {
        // We need to set collision categories based on available methods
        physicsManager.setCollisionCategory(this.ball, 'ball');
        // For ghost effect, we might need to modify collisions
        // This would depend on the implementation of the physics manager
      }
    }
      
    // Set up removal after duration
    if (duration) {
      const timeManager = this.scene.getTimeManager?.();
      if (timeManager) {
        timeManager.createTimer(
          `ball_effect_${effect}_${this.ball.getData('id')}`,
          duration,
          () => this.removeEffect(effect),
          this
        );
      }
    }

    // Emit event
    const eventManager = this.scene.getEventManager?.();
    if (eventManager) {
      eventManager.emit('ballEffectApplied', {
        ballId: this.ball.getData('id'),
        effect: effect,
        duration: duration
      });
    }
  }
    
  /**
   * Remove an effect from the ball
   */
  removeEffect(effect: string): void {
    if (!this.effects.has(effect)) return;
      
    this.effects.delete(effect);

    // Revert visual changes based on effect
    if (effect === 'fireball') {
      // Remove particle effect
      this.removeFireballEffect();
    } else if (effect === 'fast') {
      // Restore normal speed
      this.multiplyVelocity(1/1.5);
    } else if (effect === 'slow') {
      // Restore normal speed
      this.multiplyVelocity(2);
    } else if (effect === 'ghost') {
      // Restore normal appearance and collision
      const physicsManager = this.scene.getPhysicsManager?.();
      if (physicsManager) {
        // Reset collision categories
        physicsManager.setCollisionCategory(this.ball, 'ball');
      }
    }
    
    // Reset visual appearance if no effects remain
    if (this.effects.size === 0) {
      this.ball.clearTint();
      this.ball.setAlpha(1);
      // Remove all particle effects
      this.clearAllParticleEffects();
    }

    // Emit event
    const eventManager = this.scene.getEventManager?.();
    if (eventManager) {
      eventManager.emit('ballEffectRemoved', {
        ballId: this.ball.getData('id'),
        effect: effect
      });
    }
  }

  /**
   * Remove fireball effect
   */
  private removeFireballEffect(): void {
    if (this.particleControllers.length > 0) {
      const controller = this.particleControllers.shift();
      if (controller) {
        controller.destroy();
      }
    }
  }

  /**
   * Clear all particle effects
   */
  private clearAllParticleEffects(): void {
    this.particleControllers.forEach(controller => {
      if (controller) {
        controller.destroy();
      }
    });
    this.particleControllers = [];
  }

  /**
   * Multiply current velocity by a factor
   */
  multiplyVelocity(factor: number): void {
    if (this.stuckToPaddle || !this.ball || !this.ball.body) return;
    
    try {
      // Safely get velocity components
      let vx = 0;
      let vy = 0;
      
      if (this.ball.body.velocity) {
        vx = this.ball.body.velocity.x || 0;
        vy = this.ball.body.velocity.y || 0;
      }
      
      // Apply multiplier
      vx *= factor;
      vy *= factor;
      
      // Set new velocity
      this.ball.setVelocity(vx, vy);
    } catch (error) {
      // Silent fail to prevent console spam
    }
  }

  /**
   * Launch the ball with a specific velocity
   */
  launch(velocity: Phaser.Math.Vector2): void {
    this.stuckToPaddle = false;
    this.stuckPaddle = undefined;
    this.ball.setVelocity(velocity.x, velocity.y);

    // Emit event
    const eventManager = this.scene.getEventManager?.();
    if (eventManager) {
      eventManager.emit('ballLaunched', {
        ballId: this.ball.getData('id'),
        velocity: velocity
      });
    }
  }

  /**
   * Stick ball to a paddle
   */
  stick(paddle: Phaser.Physics.Matter.Sprite): void {
    this.stuckToPaddle = true;
    this.stuckPaddle = paddle;

    // Calculate offset from paddle center
    this.stuckOffset.x = this.ball.x - paddle.x;
    this.stuckOffset.y = this.ball.y - paddle.y;

    // Stop ball movement
    this.ball.setVelocity(0, 0);
  }

  /**
   * Release ball from paddle with calculated angle
   */
  release(): void {
    if (!this.stuckToPaddle || !this.stuckPaddle) return;

    // Determine launch direction based on paddle edge
    const edge = this.stuckPaddle.getData('edge');
    let angle = 0;

    switch (edge) {
      case 'bottom':
        angle = -Math.PI / 2 + (this.stuckOffset.x / (this.stuckPaddle.displayWidth / 2)) * (Math.PI / 4);
        break;
      case 'top':
        angle = Math.PI / 2 + (this.stuckOffset.x / (this.stuckPaddle.displayWidth / 2)) * (Math.PI / 4);
        break;
      case 'left':
        angle = 0 + (this.stuckOffset.y / (this.stuckPaddle.displayHeight / 2)) * (Math.PI / 4);
        break;
      case 'right':
        angle = Math.PI + (this.stuckOffset.y / (this.stuckPaddle.displayHeight / 2)) * (Math.PI / 4);
        break;
    }

    // Calculate velocity vector
    const speed = PHYSICS.BALL.INITIAL_VELOCITY;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;

    // Launch ball
    this.launch(new Phaser.Math.Vector2(vx, vy));
  }

  /**
   * Check if ball is out of bounds
   * (Combined from both implementations)
   */
  isOutOfBounds(): boolean {
    // Safety check for ball
    if (!this.ball || !this.isActive) {
      return false;
    }
    
    try {
      // Get scene dimensions safely
      const width = this.scene ? this.scene.scale.width : 800;
      const height = this.scene ? this.scene.scale.height : 600;
      const padding = 50; // Extra padding to ensure ball is truly out
      
      // Safely access ball position
      const x = this.ball.x !== undefined ? this.ball.x : 0;
      const y = this.ball.y !== undefined ? this.ball.y : 0;
      
      // Check if ball is outside the screen
      // Primary check is for bottom of screen (from second implementation)
      // But also check all edges (from first implementation)
      return (
        y > height + padding ||
        y < -padding ||
        x > width + padding ||
        x < -padding
      );
    } catch (error) {
      // Silent fail to prevent console spam
      return false;
    }
  }

  /**
   * Handle ball going out of bounds
   * (From second implementation)
   */
  private handleOutOfBounds(): void {
    // Emit event for ball out of bounds
    const eventManager = this.scene.getEventManager?.();
    if (eventManager) {
      eventManager.emit('ballOutOfBounds', { 
        ballId: this.ball.getData('id') 
      });
    }
  }

  /**
   * Get the ball game object
   */
  getBall(): Phaser.Physics.Matter.Sprite {
    return this.ball;
  }

  /**
   * Check if ball has a specific effect
   */
  hasEffect(effect: string): boolean {
    return this.effects.has(effect);
  }

  /**
   * Set minimum ball speed
   * (From second implementation)
   */
  setMinSpeed(speed: number): void {
    this.minSpeed = speed;
  }
  
  /**
   * Set maximum ball speed
   * (From second implementation)
   */
  setMaxSpeed(speed: number): void {
    this.maxSpeed = speed;
  }

  /**
   * Destroy the ball and clean up resources
   * (Combined from both implementations)
   */
  destroy(): void {
    this.isActive = false;

    // Clean up event listeners
    const eventManager = this.scene.getEventManager?.();
    if (eventManager) {
      eventManager.off('gamePaused', null, this);
      eventManager.off('gameResumed', null, this);
      eventManager.off('ballEffectApplied', null, this);
    }

    // Remove all particle effects
    this.clearAllParticleEffects();

    // Remove from physics world
    if (this.ball.body && this.scene.matter && this.scene.matter.world) {
      this.scene.matter.world.remove(this.ball.body);
    }

    // Destroy the sprite
    this.ball.destroy();
  }
}

export default BallController;